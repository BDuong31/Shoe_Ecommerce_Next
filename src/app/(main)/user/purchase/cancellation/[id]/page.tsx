import CancelView from '@/sections/order/view/cancel-view';
import React from 'react';


export const metadata = {
    title: 'Cancellation | Baso Spark',
}

export default async function CancelPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <CancelView id={id} />;
}