import CartView from '@/sections/cart/view/cart-view';
import React from 'react';


export const metadata = {
    title: 'Cart | Baso Spark',
}

export default async function CartPage() {
    return <CartView />;
}