'use client';
import Image from "next/image";
import Link from "next/link";
import { ProductListLaster } from "@/components/product/productList";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import React, { useState, useCallback, useEffect } from "react"; // Tambahkan useCallback
import Category from "@/components/category/category";
import ReviewItem from "@/components/review/reviewItem";
import { useUserProfile } from "@/context/user-context";
import { getProducts } from "@/apis/product";
import { IProductDetails } from "@/interfaces/product";
import { IConditionalImage, IImage } from "@/interfaces/image";
import { getImages } from "@/apis/image";
import { ICategory } from "@/interfaces/category";
import { getCategories } from "@/apis/category";
import { SplashScreen } from "@/components/loading";
import { IRating, IRatingWithUser } from "@/interfaces/rating";
import { getAllRatings } from "@/apis/rating";
import { IProductVariant } from "@/interfaces/variant";
import { getVariants } from "@/apis/variant";
export default function HomeView() {
    const { userProfile, loading } = useUserProfile()
    const [products, setProducts] = useState<IProductDetails[]>([]);
    const [variants, setVariants] = useState<Record<string, IProductVariant[]>>({});
    const [category, setCategory] = useState<ICategory[]>([]);
    const [reviews, setReviews] = useState<IRatingWithUser[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const calculateItemsPerPage = () => {
        if (typeof window === 'undefined') {
            return 3;
        } else if (window.innerWidth >= 1280) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    };

    const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());


    const fetcherProducts = async () => {
        setIsLoading(true);
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetcherVariants = async (productId: string) => {
        try {
            const response = await getVariants(productId);
            return response.data;
        } catch (error) {
            console.error('Error fetching images for product', productId, error);
            return [];
        }
    }

    const fetcherCategory = async () => {
        setIsLoading(true);
        try {
            const response = await getCategories();
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const fetchRatings = async () => {
        setIsLoading(true);
        try {
            const response = await getAllRatings();
            setReviews(response.data);

        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        fetcherProducts();
        fetcherCategory();
        fetchRatings();
    }, []);

    const reviewSection = reviews.slice(0, calculateItemsPerPage());
    const latestProducts = products.slice(0, 4);

    useEffect(() => {
        const fetchAllVariants = async () => {
            const variantsData: Record<string, IProductVariant[]> = {};
            for (const product of latestProducts) {
                const productVariants = await fetcherVariants(product.id);
                variantsData[product.id] = productVariants;
            }
            setVariants(variantsData);
        };

        if (latestProducts.length > 0) {
            fetchAllVariants();
        }
    }, [latestProducts]);
    const calculateCategoriesPage = useCallback(() => {
        if (!category.length) return;

        const newTotalPages = Math.ceil(category.length / itemsPerPage);
        setTotalPages(newTotalPages);

        // Nếu currentPage lớn hơn số trang mới thì điều chỉnh lại
        const safePage = Math.min(currentPage, newTotalPages || 1);
        if (safePage !== currentPage) {
            setCurrentPage(safePage);
            return; // để tránh double render
        }

        const startIdx = (safePage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        setCategories(category.slice(startIdx, endIdx));
    }, [category, currentPage, itemsPerPage]);


    React.useEffect(() => {
        calculateCategoriesPage();
    }, [calculateCategoriesPage]);

    React.useEffect(() => {
        const handleResize = () => {
            const newItemsPerPage = calculateItemsPerPage();
            if (newItemsPerPage !== itemsPerPage) {
                setItemsPerPage(newItemsPerPage);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [itemsPerPage]); 
    
    const handlePrev = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    }

    const handleNext = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    }

    if (isLoading && loading) {
        return <SplashScreen className="h-[80vh]"/>;
    }

    return (
    <>
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] max-h-[700px] py-6">
          <Image src='/slogan.png' width={1320} height={500} className='object-cover w-full h-full ' alt='slogan'/>
        </div>
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] max-h-[700px] relative rounded-[64px]">
            <Image src='/shoes.jpg' width={1320} height={500} className='object-cover rounded-3xl sm:rounded-[40px] md:rounded-[64px] w-full h-full max-h-[500px]' alt='shoes'/>
            <div className='absolute top-0 left-0 w-full h-full rounded-[64px] bg-gradient-to-t from-[#000] to-transparent opacity-80'></div>
            <div className='absolute bottom-12 md:left-12 sm:left-14 left-8 z-10 text-gray'>
                <h2 className='lg:text-[55px] md:text-[40px] font-semibold uppercase'>NIKE AIR MAX</h2>
                <p className='lg:text-[20px] md:text-[17px] max-w-[400px] mb-4'>Nike introducing the new air max for everyone's comfort</p>
                <Link href={'/newdrops'} className='uppercase bg-blue text-white py-2 px-6 text-[14px] rounded-lg'>Shop Now</Link>
            </div>
            <div className='absolute top-14 left-0 z-10 text-gray hidden sm:block'>
            <h2 className='[writing-mode:vertical-lr] rotate-180 px-4 py-4 bg-darkgrey rounded-l-xl lg:text-base text-xs'>Nike product of the year</h2>
            </div>
        </div>
        <div>
            <div className="pt-20 flex m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]">
                <h1 className='2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-darkgrey'>Don't miss out new drops</h1>
                <div className="flex-1 text-right self-end">
                    <Link className="bg-blue uppercase text-white py-3 px-6 text-[14px] rounded-lg" href={'/newdrops'}>SHOP NEW DROPS</Link>
                </div>
            </div>
            <div className="py-12 m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] max-h-[700px]">
                <ProductListLaster products={latestProducts} variants={variants} length={4} />
            </div>
        </div>
        <div className='bg-darkgrey py-24 px-6 md:px-0'>
            <div className="pb-12 flex m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]">
                <h1 className='2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-white'>CATEGORIES</h1>
                <div className="flex-1 self-end">
                    <div className='flex justify-end gap-5'>
                        <button className='p-2 bg-fawhite rounded-lg disabled:opacity-30 disabled:cursor-auto' onClick={handlePrev} disabled={currentPage === 1}>
                            <GrFormPrevious color='black' size={20}/>
                        </button>
                        <button className='p-2 bg-fawhite rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-auto' onClick={handleNext} disabled={currentPage >= totalPages}>
                            <GrFormNext color='black' size={20}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className='m-auto grid gap-9 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]'>
                {categories?.map((category, index) => (
                    console.log('Rendering category in grid:', category),
                    category && (
                        <Category key={index} category={category}/> 
                    ) 
                ))}
            </div>
        </div>
        <div className='px-6 md:px-0'>
            <div className={`pt-20 flex m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]`}>
                <h1 className='2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-darkgrey'>REVIEWS</h1>
            </div>
            <div className={`pt-12 grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-3 3xl:grid-cols-4 gap-9 m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] `}>
                {
                    reviewSection.map((review : IRatingWithUser, index) => {
                        return <ReviewItem review={review} key={review.id} className={`${index == 2 && 'hidden lg:block' || index == 1 && 'hidden sm:block'}`}/>
                    })
                }
            </div>
        </div>
    </>
    );
}