import PaymentView from '@/sections/payment/view/payment-view';
import React from 'react';


export const metadata = {
    title: 'Payment | Baso Spark',
}

export default async function PaymentPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    return <PaymentView id={id} />;
}