"use client"
import React, { useEffect, useState } from 'react'
import ReviewItem from './reviewItem'
import { mockReviews } from '@/sections/home/data/preview'
const ReviewSection = () => {
    const [Reviews, setReviews] = useState<any[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const getReviews_ = () => {
        const calculateItemsPerPage = () => {
            if (typeof window === 'undefined') {
                return 2;
            } else if (window.innerWidth >= 1280) {
                return 3;
            } else if (window.innerWidth >= 768) {
                return 3;
            } else {
                return 2;
            }
        };
        const newItemsPerPage = calculateItemsPerPage();
        setItemsPerPage(newItemsPerPage);
        setReviews(mockReviews.slice(0, newItemsPerPage));
    }
    useEffect(() => {
        getReviews_()
        const handleResize = () => {
            getReviews_();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [itemsPerPage])
  return (
    <div className='px-6 md:px-0'>
    <div className={`pt-12 grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-3 3xl:grid-cols-4 gap-9 `}>
        {
            Reviews.map((review : any, index) => (
                console.log(index),
                <ReviewItem review={review} key={review.id} className={index == 2 && 'hidden lg:block' || index == 1 && 'hidden sm:block'}/>
            ))
        }
    </div>
    </div>
  )
}

export default ReviewSection