'use client';
import mockProduct from "@/sections/home/data/product";
import React, { useEffect, useMemo, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import RatingBar from "@/components/rating/ratingBar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { mockReviews } from "@/sections/home/data/preview";
import RatingList from "@/components/review/ratingList";
import { GrFormPrevious } from "react-icons/gr";
import ReviewModal from "@/components/review/ReviewModal";

interface RatingProps {
    id: string;
}

const mockRatingDistribution = [
    { star: 5, percentage: 70 },
    { star: 4, percentage: 15 },
    { star: 3, percentage: 8 },
    { star: 2, percentage: 5 },
    { star: 1, percentage: 2 },
];

const ITEMS_PER_PAGE = 5;

const getPaginationRange = (currentPage, totalPages) => {
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

    let finalRange = [];
    for (let i = 0; i < range.length; i++) {
        if (range[i] === '...' && i > 0 && i < range.length - 1 && range[i-1] + 1 === range[i+1]) {
            // Không làm gì nếu dấu ba chấm không cần thiết
            continue;
        }
        finalRange.push(range[i]);
    }

    return finalRange;
}
export default function Rating({id} : RatingProps) {
    const product = mockProduct.find((product) => product.id === id);
    const rating = mockReviews;
    const [ratingList, setRatingList] = React.useState(rating);
    const [FilterPopup, setFilterPopup] = React.useState(false);

    const [smFilterPopup, setSmFilterPopup] = React.useState(false);
    const [FiltersApplied, setFiltersApplied] = React.useState('Newest');
    const [activeFilter, setActiveFilter] = React.useState<number | 'ALL'>('ALL');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const popupRef = useRef(null);
    const filterRef = useRef(null);

    const onFilterChange = (filter: number | 'ALL') => {
        console.log('Lọc đánh giá theo:', filter);
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
        return Math.ceil(rating.length / ITEMS_PER_PAGE);
    }, [rating.length]);

    const currentRatings = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return rating.slice(startIndex, endIndex);
    }, [currentPage, rating]);

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    const pageNumbers = getPaginationRange(currentPage, totalPages);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setSmFilterPopup(false);
            }
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setFilterPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleReviewSubmit = (reviewData: { title: string, rating: number, description: string, files: File[] }) => {
        console.log("Đánh giá sản phẩm đã được submit:", reviewData);
        // Gửi dữ liệu này lên API backend của bạn
        // reviewData.productId = product.id; // Gắn đánh giá với sản phẩm
        handleCloseModal(); // Đóng modal sau khi submit
    };
    return (
        <div className={'m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10'}>
            <h1 className="2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-darkgrey">Review for {product?.productName}</h1>
            <div className='flex flex-col gap-12'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <FaStar fill="#FFC107" size={24} />
                            <p className="text-xl font-extrabold">4.5</p>
                            <span className="text-xl font-extrabold">/5</span>
                        </div>
                        <p className="text-xl font-bold">100 RATING</p>
                        <button onClick={handleOpenModal} className=' my-2 btn btn-primary ml-4 w-[166px] h-[48px] text-white'>WRITE RATING</button>
                    </div>
                    <div className="lg:col-span-1 space-y-3 p-4">
                        {mockRatingDistribution.map((data) => (
                            <RatingBar key={data.star} star={data.star} percentage={data.percentage} />
                        ))}
                    </div>
                </div>
                {/* <ReviewSection /> */}
            </div>
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

                        {pageNumbers.map((item, index) => (
                            <React.Fragment key={index}>
                                {item === '...' ? (
                                    <span className="px-3 py-2 text-gray-700">...</span>
                                ) : (
                                    <button
                                        onClick={() => goToPage(item)}
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
                productImage={product?.images as string}
                productName={product?.productName as string}
                onReviewSubmit={handleReviewSubmit}
            />
        </div>
    )
}