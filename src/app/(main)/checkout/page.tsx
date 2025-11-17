import CheckoutView from '@/sections/checkout/view/checkout-view';
import React from 'react';

export const metadata = {
    title: 'Checkout | Baso Spark',
}

export default async function CheckoutPage() {
    return <CheckoutView />;
}