import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Rating from '@mui/material/Rating';
import { IProduct, IProductDetails } from '@/interfaces/product'
import { IImage } from '@/interfaces/image';
import { IProductVariant } from '@/interfaces/variant';
import { getVariants } from '@/apis/variant';
import { SplashScreen } from '../loading';

type ProductItemProps = {
    product: IProductDetails;
    variants?: IProductVariant[] | IProductVariant;
    images?: IImage[];
}
const ProductItem = ( { product, variants, images }: ProductItemProps) => {
    const [isSoldOut, setIsSoldOut] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    let imageUrl = '/logo.png';
    for (const img of images || []) {
        if (img.isMain) {
            imageUrl = img.url;
            break;
        }
    }

    React.useEffect(() => {
        if (variants) {
            const soldOut = variants.every(v => v.quantity === 0);
            setIsSoldOut(soldOut);
        }
    }, [variants]);

    React.useEffect(() => {
        setLoading(false);
    }, [product.id, variants]);

    if (loading) {
        return <SplashScreen />;
    }

    const avgRating = product.averageRating.avgRating || 0;
    return (
        <Link href={`/product/${product.id}`} className='flex flex-col items-center'>
            <div className='rounded-3xl relative'>
                <Image src={imageUrl} width={302} height={334} alt={product.productName} className='object-fill rounded-3xl outline outline-[#FFF] outline-[6px] w-[302px] h-[334px]'/>
            {isSoldOut ? (
                <h3 className='absolute top-0 left-0 text-white bg-[#FF0000] font-semibold px-4 py-2 rounded-tl-3xl rounded-br-3xl text-xs'>
                    Sold Out
                </h3>
            ) : (
                new Date(product.createdAt).getTime() >= Date.now() - 10 * 24 * 60 * 60 * 1000 && (
                    <h3 className='absolute top-0 left-0 text-white bg-blue font-semibold px-4 py-2 rounded-tl-3xl rounded-br-3xl text-xs'>
                        New
                    </h3>
                )
            )}
            </div>
            <div className='w-full pt-4 flex justify-between'>
                <h1 className='2xl:text-[16px] font-bold line-clamp-1 leading-6'>{product.brand.name}</h1>
                <Rating name="read-only" value={avgRating} readOnly />
            </div>
            <div className='py-4 justify-center flex'>
                <h1 className='2xl:text-[16px] font-bold line-clamp-1 leading-6'>{product.productName}</h1>
            </div>
            <button className='uppercase bg-darkgrey py-3 text-[14px] w-full text-center rounded-[8px]'>
                <span className='text-white'>view product - </span>
                <span className='text-yellow'>${product.price}</span>
            </button>
        </Link>
    )
}

export default ProductItem;