import Rating from '@/sections/rating/view/rating-view';
import React from 'react';


export const metadata = {
    title: 'Ratings | Baso Spark',
}

export default async function RatingPages({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <Rating id={id} />;
}