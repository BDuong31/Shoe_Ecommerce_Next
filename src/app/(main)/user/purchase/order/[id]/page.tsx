import OrderView from '@/sections/order/view/order-view';
import React from 'react';


export const metadata = {
    title: 'Order | Baso Spark',
}

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <OrderView id={id} />;
}