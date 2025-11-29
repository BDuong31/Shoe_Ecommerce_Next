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
import { getImages, uploadImage } from '@/apis/image';
import { getWishlistByCond } from '@/apis/wishlist';
import { useUserProfile } from '@/context/user-context';
import SplashScreen from '@/components/loading/splash-sceen';
import { useCart } from '@/context/cart-context';
import { IRating, IRatingUpdate, IRatingWithUser } from '@/interfaces/rating';
import { IUserProfile } from '@/interfaces/user';
import { getListUser } from '@/apis/user';
import { checkRatingByUserAndProduct, getRatingsById, getRatingsByProductId, updateRating} from '@/apis/rating';
import { check, set } from 'zod';
import { useToast } from '@/context/toast-context';
import { randomInt } from 'node:crypto';
import { getVariants } from '@/apis/variant';
import { IProductVariant } from '@/interfaces/variant';

interface ParamsProps {
    id: string
}

type RatingDistribution = {
    star: number;
    percentage: number;
}[];

const RatingDefault: RatingDistribution = [
    { star: 5, percentage: 0 },
    { star: 4, percentage: 0 },
    { star: 3, percentage: 0 },
    { star: 2, percentage: 0 },
    { star: 1, percentage: 0 },
];
export default function Product({id} : ParamsProps) {
    const { userProfile } = useUserProfile();
    const { showToast } = useToast();
    const [category, setCategory]  = useState("")
    const [relatedProducts, setRelatedProducts] = useState<IProductDetails[]>([]);
    const [relatedProductVariants, setRelatedProductVariants] = useState<Record<string, IProductVariant[]>>({});
    const [ProductInfos, setProductInfos] = useState<IProductDetails | null>(null);
    const [images, setImages] = useState<IImage[]>([]);
    const [imagesDefault, setImageDefault] = useState<IImage>()
    const [ratings, setRatings] = useState<IRatingWithUser[] | null>(null);
    const [users, setUsers] = useState<IUserProfile[] | null>(null);
    const [ratingDistribution, setRatingDistribution] = useState<RatingDistribution>(RatingDefault);
    const [checkedRating, setCheckedRating] = useState<boolean | null>(null);
    const [totalPages, setTotalPages] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [loading, setLoading] = useState(false);

    const fetchProductDetails = async (productId: string) => {
        setLoading(true);
        try {
            const response = await getProductById(productId);
            setProductInfos(response.data);
            setCategory(response.data.category.name || "");
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetcheVariant = async (productId: string): Promise<IProductVariant[]> => {
        setLoading(true);
        try {
            const response = await getVariants(productId);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching product variants:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }
    const fetchRelatedProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts()
            setRelatedProducts(response.data);
        } catch (error) {
            console.error('Error fetching related products:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetcherRating = async (productId: string) => {
        setLoading(true);
        try {
            const response = await getRatingsByProductId(productId);
            const ratingFilter = (response.data.filter(rating  => rating.rating > 0)).length > 0 ? response.data.filter(rating  => rating.rating > 0) : null;
            console.log('Fetched ratings:', ratingFilter);
            setRatings(ratingFilter);
        } catch (error) {
            console.error('Error fetching ratings:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetcheUserProfiles = async (ids: string[]) => {
        setLoading(true);
        try {
            const response = await getListUser(ids);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching user profiles:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetcheCheckedRating = async (productId: string) => {
        setLoading(true);
        try {
            const response = await checkRatingByUserAndProduct(productId);
            setCheckedRating(response.data);
        } catch (error) {
            console.error('Error fetching checked rating:', error);
            return null;
        } finally {
            setLoading(false);
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
        fetcheCheckedRating(id);
    }, [id]);

    useEffect(() => {
        if (ProductInfos) {
            setImageDefault(ProductInfos.images.find(img => img.isMain));
        }
    }, [ProductInfos]);

    useEffect(() => {
        if (ProductInfos) {
            console.log('ProductInfos changed, fetching ratings for product ID:', ProductInfos.id);
            fetcherRating(ProductInfos.id);
        } else {
            setRatings(null);
        }
    }, [checkedRating, ProductInfos]);

    useEffect(() => {
        if (ratings && ratings.length > 0) {
            const userIds = Array.from(new Set(ratings.map(rating => rating.userId)));
            fetcheUserProfiles(userIds);
            for (let i = 1; i <= 5; i++) {
                const count = ratings.filter(rating => rating.rating === i).length;
                const percentage = (count / ratings.length) * 100;
                setRatingDistribution(prevDistribution => {
                    const newDistribution = prevDistribution.map(dist => {
                        if (dist.star === i) {
                            return { star: i, percentage: Math.round(percentage) };
                        }
                        return dist;
                    });
                    return newDistribution;
                });
            }
        }
    }, [ratings, id]);

    useEffect(() => {
        fetchRelatedProducts();
    }, []);

    useEffect(() => {
        if (relatedProducts.length > 0) {
            const fetchAllVariants = async () => {
                const variantsData: Record<string, IProductVariant[]> = {};
                for (const product of relatedProducts) {
                    const productVariants = await fetcheVariant(product.id);
                    variantsData[product.id] = productVariants;
                }
                setRelatedProductVariants(variantsData);
            };

            fetchAllVariants();
        }
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
        if (checkedRating){
            setIsModalOpen(true);
        } else {
            showToast('You can only rate products you’ve purchased, and it looks like you may have already rated this one.', 'warning');
        }
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleReviewSubmit = async (reviewData: { rating: number, description: string, files: File[] }) => {
        handleCloseModal();
        setLoading(true);
        let ratingId: string | undefined = undefined;

        try {
            const { rating: newRatingValue, description: newComment, files } = reviewData;

            const response = await getRatingsByProductId(id);
            const existingRatings = response.data;
            const existingRating = existingRatings.find(rating => rating.userId === userProfile?.id);

            if (existingRating) {
                ratingId = existingRating.id;
            } else {
                showToast('No existing rating found to update', 'error');
                throw new Error('No existing rating found to update');
            }
            const ratingUpdate: IRatingUpdate = {
                rating: newRatingValue,
                comment: newComment,
            }

            const ratingUpdateResponse = await updateRating(ratingId!, ratingUpdate); 
            if (!ratingUpdateResponse) { 
                showToast('Failed to update rating', 'error');
                throw new Error('Failed to update rating');
            }

            const imagePromises = files.map((file) => {
                const isCover = file === files[0];
                const imageDto: IImageCreate = {
                    isMain: isCover,
                    refId: ratingId || '',
                    type: 'rating'
                };
                return uploadImage(imageDto, file)
            });

            await Promise.all(imagePromises);

            if (ProductInfos) {
                await fetcherRating(ProductInfos.id);
            }

            showToast('Rating submitted successfully', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to submit review', 'error');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <SplashScreen className='h-[80vh]' />;
    }
    return (
        <div className={'m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]'}>
            <div className='grid md:grid-cols-2 grid-cols-1 py-10 gap-9'>
                {ProductInfos && (
                    <>
                        <ProductImage images={ProductInfos ? ProductInfos.images : []} />
                        <ProductDetails product={ProductInfos ? ProductInfos : null} />
                    </>
                )}
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
            <ProductListLaster products={paginatedProducts} variants={relatedProductVariants} length={4}  /> 

            <div className='flex gap-2 py-4 justify-center'>
                {
                    Array.from({ length: totalPages }).map((_, i) => {
                        return <span key={i} className={`w-10 h-1 rounded-3xl ${currentPage === i + 1 ? 'bg-blue' : 'bg-darkgrey opacity-25'}`}></span>
                    })
                }
            </div>
            <div className='flex flex-col mt-[102px] gap-12'>
                <h1 className='2xl:text-[74px] xl:text-[74px] lg:text-[60px] md:text-[54px] sm:text-[54px] text-[34px] font-semibold flex-1 text-darkgrey uppercase'>Reviews for {ProductInfos?.productName}</h1>
                {ProductInfos && ProductInfos.averageRating.totalRating > 0 ? (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                                <div className="flex flex-col items-center justify-center p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaStar fill="#FFC107" size={24} />
                                        <p className="text-xl font-extrabold">{ProductInfos?.averageRating.avgRating}</p>
                                        <span className="text-xl font-extrabold">/5</span>
                                    </div>
                                    <p className="text-xl font-bold">{ProductInfos?.averageRating.totalRating} RATING</p>
                                </div>
                                <div className="lg:col-span-1 space-y-3 p-4">
                                    {ratingDistribution && ratingDistribution.map((data) => (
                                        <RatingBar key={data.star} star={data.star} percentage={data.percentage} />
                                    ))}
                                </div>
                            </div>
                            <ReviewSection productId={id} />
                            <div className='flex justify-center mt-4 mb-10'>
                                <Link href={`/rating/${id}`}>
                                    <button className='btn btn-outline w-[166px] h-[48px]'>SEE ALL</button>
                                </Link>
                                <button onClick={handleOpenModal} className='btn btn-primary ml-4 w-[166px] h-[48px]'>WRITE RATING</button>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-darkgrey text-lg mb-4'>No reviews yet. Be the first to write a review!</p>
                            <button onClick={handleOpenModal} className='btn btn-primary w-[166px] h-[48px]'>WRITE RATING</button>
                        </div>
                )}
            </div>
            <ReviewModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productImage={imagesDefault?.url || '/logo.png'}
                productName={ProductInfos?.productName || ''}
                onReviewSubmit={handleReviewSubmit}
            />
        </div>
    )
}