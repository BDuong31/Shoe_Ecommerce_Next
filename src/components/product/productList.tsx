import React from 'react';
import ProductItem from './productItem';
import { IProductDetails } from '@/interfaces/product';
import { IImage } from '@/interfaces/image';

type ProductListProps = {
    products: IProductDetails[];
    images: Record<string, IImage[]>;
    length?: number;
}

const ProductList = ({ products, images, length = 3 }: ProductListProps) => {
    return (
        <div className={`3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] m-auto grid xl:grid-cols-${length} lg:grid-cols-${length} grid-cols-${length} gap-8`}>
            {products.map((product:IProductDetails) => (
                <ProductItem key={product.id} product={product} images={images[product.id]} />
            ))}
        </div>
    )
}

const ProductListLaster = ({ products, images, length }: ProductListProps) =>{
    return (
        <div className={`3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] m-auto grid xl:grid-cols-${length} lg:grid-cols-${length} grid-cols-${length} gap-8`}>
            {products.map((product: IProductDetails) => (
                <ProductItem key={product.id} product={product} images={images[product.id]} />
            ))}
        </div>
    )
}


export default ProductList;

export {ProductListLaster};
