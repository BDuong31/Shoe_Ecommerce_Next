import Link from "next/link";
import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";

const RatingItem = ({ rating }: any) => {
    return (
        <div className='flex-col flex gap-2 rounded-t-3xl'>
            <div className="flex gap-[15px] items-center">
                <Image src={rating.attributes?.userphoto?.data?.attributes?.url} width={50} height={50} alt='User Photo' objectFit='cover' className='object-cover aspect-square rounded-full max-h-[50px]'/>
                <div className="flex-col flex gap-1">
                    <h2 className='text-[20px] font-semibold'>UserName</h2>
                    <Rating value={rating.attributes?.rating} readOnly />
                </div>
            </div>
            <p className='text-[14px] line-clamp-1'>{rating.attributes?.description}</p>
            <div className="flex">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Image
                        key={i}
                        src={rating.attributes?.reviewphoto?.data?.attributes?.url}
                        width={120}
                        height={120}
                        alt='User Photo'
                        style={{ objectFit: 'cover' }}
                        className='object-cover aspect-square rounded-b-3xl'
                    />
                ))}
            </div>
        </div>
    )
}

export default RatingItem;