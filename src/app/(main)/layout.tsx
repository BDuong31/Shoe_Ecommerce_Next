import React from 'react';

import Header from '@/components/header/header';
import Footer from '@/components/footer';
import { ProfileProvider } from '@/context/user-context';
import { CartProvider } from '@/context/cart-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProfileProvider>
      <CartProvider>
        <div className='pt-8'>
            <Header />
            {children}
            <Footer />
        </div>
      </CartProvider>
    </ProfileProvider>
  );
}
