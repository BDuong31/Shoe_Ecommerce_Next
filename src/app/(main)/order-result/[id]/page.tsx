import PaymentResultView from '@/sections/payment-result/view/payment-result-view';
import React from 'react';


export const metadata = {
    title: 'Order Result | Baso Spark',
}

export default async function OrderResultPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    return <PaymentResultView id={id} />;
}