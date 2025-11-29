'use client';

import { ICart, ICartItem } from '@/interfaces/cart';
import React from 'react';
import { useAuth } from './auth-context';
import { createCart, getCartByUserId, getCartItemByCartId } from '@/apis/cart';
import { useUserProfile } from './user-context';

interface CartContextType {
    cart: ICart | undefined;
    setCart: (cart: ICart | undefined) => void;
    cartItem: ICartItem[] | undefined;
    setCartItem: (items: ICartItem[] | undefined) => void;
    voucherCode: string | null;
    applyVoucher: (code: string) => void;
    clearVoucher: () => void;
    loading: boolean;
    error: Error | null;
    refeshCart: () => Promise<void>;
    refeshCartItem: () => Promise<void>;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const { userProfile } = useUserProfile();
    const [cart, setCart] = React.useState<ICart>();
    const [cartItem, setCartItem] = React.useState<ICartItem[] | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);
    
    const [voucherCode, setVoucherCode] = React.useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeVoucher');
        }
        return null;
    });

    const fetchCart = React.useCallback(async () => {
        if (!isAuthenticated || !userProfile?.id) {
            return;
        }

        setLoading(true);
        setError(null);
        const userId = userProfile.id;

        try {
            const res = await getCartByUserId(userId);
            if (res.data) {
                setCart(res.data);
            } else {
                const createRes = await createCart(userId);
                setCart(createRes.data);
            }
        } catch (err) {
            console.error('Error fetching or creating cart:', err);
            try {
                const createRes = await createCart(userId);
                setCart(createRes.data);
            } catch (createErr) {
                console.error('Failed to create cart after get failed:', createErr);
                setError(createErr as Error);
            }
        }
    }, [isAuthenticated, userProfile]);

    const fetchCartItem = React.useCallback(async () => {
        if (!cart) {
            setCartItem(undefined);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await getCartItemByCartId(cart.id);
            setCartItem(response.data);
        } catch (err) {
            console.error('Failed to fetch cart items:', err);
            setError(err as Error);
            setCartItem([]); 
        } finally {
            setLoading(false); 
        }
    }, [cart]); 

    React.useEffect(() => {
        if (isAuthenticated && userProfile) {
            fetchCart();
        } else {
            setCart(undefined);
            setCartItem(undefined);
            setError(null);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('activeVoucher');
            }
            setVoucherCode(null); 
            setLoading(false);
        }
    }, [isAuthenticated, userProfile, fetchCart]);

    React.useEffect(() => {
        fetchCartItem();
    }, [cart, fetchCartItem]); 

    const applyVoucher = (code: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeVoucher', code);
        }
        setVoucherCode(code);
    }

    const clearVoucher = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('activeVoucher');
        }
        setVoucherCode(null);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                cartItem,
                setCartItem,
                voucherCode,
                applyVoucher,
                clearVoucher,
                loading,
                error,
                refeshCart: fetchCart, 
                refeshCartItem: fetchCartItem, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}