"use client"
import React, { useEffect, useState, useMemo, use } from 'react'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { space } from 'postcss/lib/list'
import ProductDetails from '@/components/product/productDetail';
import mockProduct from '@/sections/home/data/product';
import ProductImage from '@/components/product/ProductImage';
import ProductList, { ProductListLaster } from '@/components/product/productList';
import { FaS, FaStar } from 'react-icons/fa6';
import RatingBar from '@/components/rating/ratingBar';
import ReviewSection from '@/components/review/reviewList';
import Link from 'next/dist/client/link';
import ReviewModal from '@/components/review/ReviewModal';
import { IProductDetails } from '@/interfaces/product';
import { IConditionalImage, IImage, IImageCreate } from '@/interfaces/image';
import { getProductById, getProducts } from '@/apis/product';
import { getImages } from '@/apis/image';
import { getWishlistByCond } from '@/apis/wishlist';
import { useUserProfile } from '@/context/user-context';

interface ParamsProps {
    id: string
}

const mockRatingDistribution = [
    { star: 5, percentage: 70 },
    { star: 4, percentage: 15 },
    { star: 3, percentage: 8 },
    { star: 2, percentage: 5 },
    { star: 1, percentage: 2 },
];
export default function Product({id} : ParamsProps) {
    const { userProfile } = useUserProfile();
    const [category, setCategory]  = useState("")
    const [relatedProducts, setRelatedProducts] = useState<IProductDetails[]>([]);
    const [relatedImages, setRelatedImages] = useState<Record<string, IImage[]>>({});
    const [ProductInfos, setProductInfos] = useState<IProductDetails | null>(null);
    const [images, setImages] = useState<IImage[]>([]);
    const [imagesDefault, setImageDefault] = useState<IImage>()
    const [totalPages, setTotalPages] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const fetchProductDetails = async (productId: string) => {
        try {
            const response = await getProductById(productId);
            console.log('Fetched product details:', response);
            setProductInfos(response.data);
            setCategory(response.data.category.name || "");
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    const fetchImages = async (id: string) => {
        try {
            const dto: IConditionalImage = {
                refId: id,
                type: 'product',
            }
            const response = await getImages(dto);
            console.log('Fetched images:', response);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    const fetchRelatedProducts = async () => {
        try {
            const response = await getProducts()
            console.log('Fetched related products:', response);
            setRelatedProducts(response.data);
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    }
    
    const fetchRelatedImages = async (productIds: string) => {
        try {
            const dto: IConditionalImage = {
                refId: productIds,
                type: 'product',
            }
            const response = await getImages(dto);
            console.log('Fetched related images:', response);
            setRelatedImages(prevImages => ({ ...prevImages, [productIds]: response.data }));
        } catch (error) {
            console.error('Error fetching related images:', error);
        }
    }



    useEffect(() => {
        const calculateItemsPerPage = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth >= 1280) {
                    setItemsPerPage(4);
                } else if (window.innerWidth >= 1024) {
                    setItemsPerPage(2);
                } else {
                    setItemsPerPage(1);
                }
            }
        };

        calculateItemsPerPage();
        window.addEventListener('resize', calculateItemsPerPage);

        return () => window.removeEventListener('resize', calculateItemsPerPage);
    }, []);

    useEffect(() => {
        fetchProductDetails(id);
        fetchImages(id);
        images.forEach((e) => {
            if(e.isMain) {
                return setImageDefault(e);
            }
        })
    }, [id]);

    useEffect(() => {
        fetchRelatedProducts();
    }, []);

    useEffect(() => {
        relatedProducts.forEach((e) => {
            fetchRelatedImages(e.id);
        })
    }, [relatedProducts]);

    useEffect(() => {
        if (relatedProducts.length > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(relatedProducts.length / itemsPerPage));
        } else {
            setTotalPages(0);
        }
        if (currentPage > totalPages) {
            setCurrentPage(totalPages > 0 ? totalPages : 1);
        }
    }, [relatedProducts.length, itemsPerPage, currentPage, totalPages]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return relatedProducts.slice(startIndex, endIndex);
    }, [relatedProducts, currentPage, itemsPerPage]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleReviewSubmit = (reviewData: any) => {
        console.log("Review submitted:", reviewData);
        handleCloseModal();
    }
    return (
        <div className={'m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]'}>
            <div className='grid md:grid-cols-2 grid-cols-1 py-10 gap-9'>
                <ProductImage images={images} />
                <ProductDetails product={ProductInfos ? ProductInfos : null} />
            </div>
            <div>
                <div className={`pb-5 flex m-auto`}>
                    <h1 className='2xl:text-[40px] xl:text-[30px] lg:text-[30px] md:text-[30px] sm:text-[30px] text-[24px] font-semibold flex-1 text-darkgrey'>You may also like</h1>
                    <div className='flex-1 self-end'>
                        <div className='flex justify-end gap-5'>
                            <button className='p-2 bg-darkgrey rounded-lg disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                <GrFormPrevious color='white' size={20}/>
                            </button>
                            <button className='p-2 bg-darkgrey rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                <GrFormNext color='white' size={20}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductListLaster products={paginatedProducts} images={relatedImages} length={4}  /> 

            <div className='flex gap-2 py-4 justify-center'>
                {
                    Array.from({ length: totalPages }).map((_, i) => {
                        return <span key={i} className={`w-10 h-1 rounded-3xl ${currentPage === i + 1 ? 'bg-blue' : 'bg-darkgrey opacity-25'}`}></span>
                    })
                }
            </div>
            <div className='flex flex-col mt-[102px] gap-12'>
                <h1 className='2xl:text-[74px] xl:text-[74px] lg:text-[60px] md:text-[54px] sm:text-[54px] text-[34px] font-semibold flex-1 text-darkgrey uppercase'>Reviews for {ProductInfos?.productName}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <FaStar fill="#FFC107" size={24} />
                            <p className="text-xl font-extrabold">4.5</p>
                            <span className="text-xl font-extrabold">/5</span>
                        </div>
                        <p className="text-xl font-bold">100 RATING</p>
                    </div>
                    <div className="lg:col-span-1 space-y-3 p-4">
                        {mockRatingDistribution.map((data) => (
                            <RatingBar key={data.star} star={data.star} percentage={data.percentage} />
                        ))}
                    </div>
                </div>
                <ReviewSection />
                <div className='flex justify-center mt-4 mb-10'>
                    <Link href={`/rating/${id}`}>
                        <button className='btn btn-outline w-[166px] h-[48px]'>SEE ALL</button>
                    </Link>
                    <button onClick={handleOpenModal} className='btn btn-primary ml-4 w-[166px] h-[48px]'>WRITE RATING</button>
                </div>
            </div>
            <ReviewModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productImage={imagesDefault?.url || '/baso.png'}
                productName={ProductInfos?.productName || ''}
                onReviewSubmit={handleReviewSubmit}
            />
        </div>
    )
}