'use client';
import mockProduct from "@/sections/home/data/product";
import React, { use, useEffect, useMemo, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import RatingBar from "@/components/rating/ratingBar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { mockReviews } from "@/sections/home/data/preview";
import RatingList from "@/components/review/ratingList";
import { GrFormPrevious } from "react-icons/gr";
import ReviewModal from "@/components/review/ReviewModal";
import { useUserProfile } from "@/context/user-context";
import { useToast } from "@/context/toast-context";
import { IRating, IRatingUpdate, IRatingWithUser } from "@/interfaces/rating";
import { checkRatingByUserAndProduct, getAllRatings, getRatingsByProductId, updateRating } from "@/apis/rating";
import { IProductDetails } from "@/interfaces/product";
import { getProductById } from "@/apis/product";
import { SplashScreen } from "@/components/loading";
import { IImageCreate } from "@/interfaces/image";
import { uploadImage } from "@/apis/image";

interface RatingProps {
    id: string;
}

type RatingDistribution = {
    star: number;
    percentage: number;
}[]

const RatingDefault: RatingDistribution = [
    { star: 5, percentage: 0 },
    { star: 4, percentage: 0 },
    { star: 3, percentage: 0 },
    { star: 2, percentage: 0 },
    { star: 1, percentage: 0 },
]

const ITEMS_PER_PAGE = 5;

const getPaginationRange = (currentPage: number, totalPages: number) => {
    const range = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
        return range;
    }

    range.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
        range.push('...');
    } else if (startPage === 2 && totalPages > 3) {
        range.push(2);
    }

    for (let i = startPage; i <= endPage; i++) {
        if (!range.includes(i)) {
            range.push(i);
        }
    }

    if (endPage < totalPages - 1) {
        range.push('...');
    } else if (endPage === totalPages - 1 && totalPages > 3) {
        range.push(totalPages - 1);
    }

    if (!range.includes(totalPages)) {
        range.push(totalPages);
    }

    let finalRange: (number | string)[] = [];
    for (let i = 0; i < range.length; i++) {
        const current = range[i];
        const prev = range[i - 1];
        const next = range[i + 1];

        if (
            current === '...' &&
            i > 0 &&
            i < range.length - 1 &&
            typeof prev === 'number' &&
            typeof next === 'number' &&
            prev + 1 === next
        ) {
            continue;
        }
        finalRange.push(current);
    }

    return finalRange;
}
export default function Rating({id} : RatingProps) {
    const { userProfile } = useUserProfile();
    const { showToast } = useToast();
    const [product, setProduct] = React.useState<IProductDetails | null>(null);
    const [ratingsList, setRatingsList] = React.useState<IRatingWithUser[]>([]);
    const [originalRatingsList, setOriginalRatingsList] = React.useState<IRatingWithUser[]>([]);
    const [ratingDistribution, setRatingDistribution] = React.useState<RatingDistribution>(RatingDefault);
    const [checkedRating, setCheckedRating] = React.useState<boolean | null>(null);
    const [FilterPopup, setFilterPopup] = React.useState(false);

    const [smFilterPopup, setSmFilterPopup] = React.useState(false);
    const [FiltersApplied, setFiltersApplied] = React.useState('Newest');
    const [activeFilter, setActiveFilter] = React.useState<number | 'ALL'>('ALL');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const popupRef = useRef<HTMLDivElement | null>(null);
    const filterRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = React.useState(true);

    const fetcheRatingsByProductId = async (productId: string) => {
        setLoading(true);
        try {
            const response = await getRatingsByProductId(productId);
            setOriginalRatingsList(response.data);
            setRatingsList(response.data);
        } catch (error) {
            console.error('Error fetching ratings by product ID:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetcheCheckedRating = async (productId: string) => {
        setLoading(true);
        try {
            const responsne = await checkRatingByUserAndProduct(productId);
            setCheckedRating(responsne.data);
        } catch (error) {
            console.error('Error checking rating by user:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchProductById = async (productId: string) => {
        setLoading(true);
        try {
            const response = await getProductById(productId);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product by ID:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetcheRatingsByProductId(id);
        fetchProductById(id);
        if (userProfile) {
            fetcheCheckedRating(id);
        }
    }, [id, userProfile]);

    useEffect(() => {
        if (ratingsList.length > 0) {
            for (let i = 1; i <= 5; i++) {
                const count = ratingsList.filter(rating => rating.rating === i).length;
                const percentage = (count / ratingsList.length) * 100;
                setRatingDistribution(prev => {
                    if (prev) {
                        return [...prev.filter(r => r.star !== i), { star: i, percentage }];
                    } else {
                        return [{ star: i, percentage }];
                    }
                });
            }
        }
    }, [ratingsList]);

    const onFilterChange = (filter: number | 'ALL') => {
        console.log('Lọc đánh giá theo:', filter);
        const safeList = Array.isArray(originalRatingsList) ? originalRatingsList : [];
        let filtered = [];

        console.log('Original Ratings:', originalRatingsList);
        if (filter !== 'ALL') {
            filtered = safeList.filter(rating => rating.rating === filter);
        } else {
            filtered = [...safeList];
        }
        setRatingsList(filtered);
    };
    const ratings = [5, 4, 3, 2, 1];

    const handleClick = (rating: number | 'ALL') => {
        setActiveFilter(rating);
        onFilterChange(rating);
    };

    const getButtonClasses = (rating: number | 'ALL') => {
        if (rating === 'ALL') {
            const isActive = activeFilter === 'ALL';
            let classes = 'flex gap-[5px] items-center justify-center space-x-1 px-[15px] py-[12px] border-2 rounded-[20px] text-lg font-semibold transition duration-200 min-w-[80px]';
            
            if (isActive) {
                classes += ' bg-[#B9B9B6] border-[#B9B9B6] shadow-md';
            } else {
                classes += ' border-[#B9B9B6] hover:bg-gray text-darkgrey';
            }
            return classes;
        } else {
            const isActive = activeFilter === rating;
            let classes = 'flex gap-[5px] items-center justify-center space-x-1 px-[15px] py-[12px] border-2 rounded-[20px] text-lg font-semibold transition duration-200 min-w-[80px]';
            
            if (isActive) {
                classes += ' bg-[#B9B9B6] border-[#B9B9B6] shadow-md text-yellow';
            } else {
                classes += ' border-[#B9B9B6] hover:bg-gray text-yellow';
            }
            return classes;
        }   
    };

    const totalPages = useMemo(() => {
        return Math.ceil(ratingsList.length / ITEMS_PER_PAGE);
    }, [ratingsList.length]);

    const currentRatings = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return ratingsList.slice(startIndex, endIndex);
    }, [currentPage, ratingsList]);

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    const pageNumbers = getPaginationRange(currentPage, totalPages);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Ensure event.target is a Node before calling contains
            if (filterRef.current && event.target instanceof Node && !filterRef.current.contains(event.target)) {
                setSmFilterPopup(false);
            }
            if (popupRef.current && event.target instanceof Node && !popupRef.current.contains(event.target)) {
                setFilterPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => {
        if (checkedRating) {
            setIsModalOpen(true);
        } else {
            showToast('You can only rate products you’ve purchased, and it looks like you may have already rated this one.', 'warning');
        }
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleReviewSubmit = async (reviewData: { rating: number, description: string, files: File[] }) => {
        console.log("Đánh giá sản phẩm đã được submit:", reviewData);
        handleCloseModal(); 
        setLoading(true);
        let ratingId: string | undefined = undefined;

        try {
            const { rating: newRatingValue, description: newComment, files } = reviewData;

            const response = await getRatingsByProductId(id);
            const existingRatings = response.data;
            console.log('existing ratings: ', existingRatings);
            const existingRating = existingRatings.find(rating => rating.userId === userProfile?.id);

            if (existingRating) {
                ratingId = existingRating.id;
            } else {
                showToast('No existing rating found to update', 'error');
                throw new Error('No existing rating found to update');
            }
            console.log('rating id: ', ratingId);
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

            if (product) {
                await fetcheRatingsByProductId(product.id);
            }

            showToast('Rating submitted successfully', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to submit review', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SplashScreen className="h-[80vh]" />;
    }
    return (
        <div className={'m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10'}>
            <h1 className="2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-darkgrey">Review for {product?.productName}</h1>
            
            {product && product?.averageRating?.totalRating > 0 ? (
                    <div className='flex flex-col gap-12'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                            <div className="flex flex-col items-center justify-center p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaStar fill="#FFC107" size={24} />
                                    <p className="text-xl font-extrabold">{product.averageRating.avgRating}</p>
                                    <span className="text-xl font-extrabold">/5</span>
                                </div>
                                <p className="text-xl font-bold">{product.averageRating.totalRating} RATING</p>
                                <button onClick={handleOpenModal} className=' my-2 btn btn-primary ml-4 w-[166px] h-[48px] text-white'>WRITE RATING</button>
                            </div>
                            <div className="lg:col-span-1 space-y-3 p-4">
                                {ratingDistribution?.map((data) => (
                                    <RatingBar key={data.star} star={data.star} percentage={data.percentage} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center mt-12'>
                        <p className='text-xl font-semibold mb-4'>Chưa có đánh giá nào cho sản phẩm này.</p>
                        <button onClick={handleOpenModal} className=' btn btn-primary w-[166px] h-[48px] text-white'>WRITE RATING</button>
                    </div>
                )
            }
            <div className='hidden lg:flex justify-between items-center px-2 py-7'>
                <div className=''>
                    <div className="flex flex-wrap gap-4 p-4">
                        <button 
                            onClick={() => handleClick('ALL')}
                            className={getButtonClasses('ALL')}
                        >
                            ALL
                        </button>

                        {ratings.map((rating) => (
                            <button
                            key={rating}
                            onClick={() => handleClick(rating)}
                            className={getButtonClasses(rating)}
                            >
                                <FaStar className="text-yellow " size={20} />
                                {rating}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='relative'>
                    <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setFilterPopup(!FilterPopup)}>
                        <p className='text-left font-semibold  uppercase'>{FiltersApplied}</p>
                        {FilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                    </button>
                    {
                        FilterPopup &&
                        <ul className='py-3 px-4 text-left font-semibold text-lgfont-semibold uppercase bg-fawhite pt-6 -mt-4 rounded-b-xl absolute z-20 left-0 right-0'>
                            {/* <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Trending</button></li> */}
                            <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Newest</button></li>
                            <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Star Asc</button></li>
                            <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Star Desc</button></li>
                        </ul>
                    }
                </div>
            </div>
            <div className='lg:hidden pb-5'>
                <div className='flex gap-5'>  
                    
                    <div className='relative'>
                        <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setFilterPopup(!FilterPopup)}>
                            <p className='text-left font-semibold  uppercase'>{FiltersApplied}</p>
                            {FilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                        </button>
                        {
                            FilterPopup &&
                            <ul className='py-3 px-4 text-left font-semibold text-lgfont-semibold uppercase bg-white pt-6 -mt-4 rounded-b-xl absolute z-20 left-0 right-0'>
                                {/* <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Trending</button></li> */}
                                <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Newest</button></li>
                                <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Price Asc</button></li>
                                <li><button className='uppercase mb-1' onClick={(e) => {setFiltersApplied(e.currentTarget.innerText); setFilterPopup(!FilterPopup)}}>Price Desc</button></li>
                            </ul>
                        }
                    </div>
                </div>
                <div className='py-5'>
                    <h2 className='text-xl font-semibold'>New Drops</h2>
                    <p>items</p>
                </div>
            </div>
            <div>
                <RatingList ratings={currentRatings} />
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100 transition flex items-center gap-1 font-semibold uppercase px-4"
                        >
                            <GrFormPrevious size={18} /> PREVIOUS
                        </button>

                        {pageNumbers.map((item:number | string, index:number) => (
                            <React.Fragment key={index}>
                                {item === '...' ? (
                                    <span className="px-3 py-2 text-gray-700">...</span>
                                ) : (
                                    <button
                                        onClick={() => goToPage(item as number)}
                                        className={`px-4 py-2 rounded-xl font-semibold transition border ${
                                            currentPage === item 
                                                ? 'bg-black text-white border-black bg-neutral-950' // Trang hiện tại: nền đen
                                                : 'text-black border-gray-300 hover:bg-gray-100' // Trang khác: nền trắng, border nhẹ
                                            }`}
                                        >
                                        {item}
                                    </button>
                                    )}
                            </React.Fragment>
                        ))}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100 transition flex items-center gap-1 font-semibold uppercase px-4"
                        >
                            NEXT <GrFormPrevious size={18} className="rotate-180" />
                        </button>
                    </div> 
                )}
            </div>
            <ReviewModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productImage={product?.images?.find(img => img.isMain)?.url as string}
                productName={product?.productName as string}
                onReviewSubmit={handleReviewSubmit}
            />
        </div>
    )
}