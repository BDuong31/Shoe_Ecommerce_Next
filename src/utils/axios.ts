'use client';

import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';

import { HOST_API } from '../global-config';
import { get } from 'http';
import { read } from 'fs';
import { verify } from 'crypto';
import { create } from 'domain';
import CartItem from '@/components/cart/cartItem';
import { is } from 'zod/v4/locales';
import { getCouponByCondition } from '@/apis/coupon';
import { ICouponCondition } from '@/interfaces/coupon';
import { IConditionalProduct } from '@/interfaces/product';
import { use } from 'react';
import { check } from 'zod';

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token && config.headers){
            config.headers['Authorization'] =`Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) =>{
        if (error.response && error.response.status === 401){
            if (typeof window !== 'undefined'){
                const router = useRouter();
                router.push('/login');
            }
        }
        return Promise.reject(
            (error.response && error.response.data) || 'Đã xảy ra lỗi'
        )
    }
)

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) =>{
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config});

    return res.data;
}

const VERSION_PREFIX = '/v1';

export const endpoints = {
    auth: {
        login: `${VERSION_PREFIX}/authenticate`,
        register: `${VERSION_PREFIX}/register`,
        introspect: `${VERSION_PREFIX}/rpc/introspect`,
    },

    user: {
        profile: `${VERSION_PREFIX}/profile`,
        updateProfile: `${VERSION_PREFIX}/profile`,
        updatePassword: `${VERSION_PREFIX}/update-password`,
        updateUser: (userId: string) =>
            `${VERSION_PREFIX}/users/${userId}`,
        deleteUser: (userId: string) =>
            `${VERSION_PREFIX}/users/${userId}`,
        profileById: (userId: string) =>
            `${VERSION_PREFIX}/rpc/users/${userId}`,
        updateUserByAdmin: (userId: string) =>
            `${VERSION_PREFIX}/rpc/users/${userId}`,
        getListUser: `${VERSION_PREFIX}/rpc/users/list-by-ids`,

        getUserCoupons: `${VERSION_PREFIX}/user/coupons`,
        createUserCoupon: `${VERSION_PREFIX}/user/coupons/assign`,
        checkUserCoupon: (couponId: string) =>
            `${VERSION_PREFIX}/user/coupons/check/${couponId}`,
        useUserCoupon: (couponId: string) => `${VERSION_PREFIX}/user/coupons/use/${couponId}`
    },

    address: {
        createAddress: `${VERSION_PREFIX}/addresses`,
        getAddress: `${VERSION_PREFIX}/addresses`,
        getAddressById: (addressId: string) =>
            `${VERSION_PREFIX}/addresses/${addressId}`,
        getAddressByCond: (id: string, isDefault: boolean) =>
            `${VERSION_PREFIX}/addresses?userId=${id}&isDefault=${isDefault}`,
        updateAddress: (addressId: string) =>
            `${VERSION_PREFIX}/addresses/${addressId}`,
        deleteAddress: (addressId: string) =>
            `${VERSION_PREFIX}/addresses/${addressId}`,
        getListAddress: `${VERSION_PREFIX}/rpc/addresses/list-by-ids`
    },

    brand: {
        createBrand: `${VERSION_PREFIX}/brands`,
        getBrands: `${VERSION_PREFIX}/brands`,
        getBrandById: (brandId: string) =>
            `${VERSION_PREFIX}/brands/${brandId}`,
        updateBrand: (brandId: string) =>
            `${VERSION_PREFIX}/brands/${brandId}`,
        deleteBrand: (brandId: string) =>
            `${VERSION_PREFIX}/brands/${brandId}`,
        getListBrand: `${VERSION_PREFIX}/rpc/brands/list-by-ids`
    },
    category: {
        createCategory: `${VERSION_PREFIX}/categories`,
        getCategories: `${VERSION_PREFIX}/categories`,
        getCategoryById: (categoryId: string) =>
            `${VERSION_PREFIX}/categories/${categoryId}`,
        updateCategory: (categoryId: string) =>
            `${VERSION_PREFIX}/categories/${categoryId}`,
        deleteCategory: (categoryId: string) =>
            `${VERSION_PREFIX}/categories/${categoryId}`,
        getListCategory: `${VERSION_PREFIX}/rpc/categories/list-by-ids`
    },

    product: {
        createProduct: `${VERSION_PREFIX}/products`,
        getProducts: `${VERSION_PREFIX}/products`,
        getProductById: (productId: string) =>
            `${VERSION_PREFIX}/products/${productId}`,
        getProductByCondition: (dto: IConditionalProduct) => {
            let url = `${VERSION_PREFIX}/products?`;
            if (dto.categoryId) {
                url += `categoryId=${dto.categoryId}&`;
            }
            if (dto.brandId) {
                url += `brandId=${dto.brandId}&`;
            }
            return url.slice(0, -1);
        },
        updateProduct: (productId: string) =>
            `${VERSION_PREFIX}/products/${productId}`,
        deleteProduct: (productId: string) =>
            `${VERSION_PREFIX}/products/${productId}`,
        getListProduct: `${VERSION_PREFIX}/rpc/products/list-by-ids`
    },

    favorite: {
        createFavorite: `${VERSION_PREFIX}/favorites`,
        getFavorites: `${VERSION_PREFIX}/favorites`,
        getFavoriteById: (favoriteId: string) =>
            `${VERSION_PREFIX}/favorites/${favoriteId}`,
        getFavoriteCondition: (userId: string, productId: string) =>
            `${VERSION_PREFIX}/favorites?userId=${userId}&productId=${productId}`,
        updateFavorite: (favoriteId: string) =>
            `${VERSION_PREFIX}/favorites/${favoriteId}`,
        deleteFavorite: (favoriteId: string) =>
            `${VERSION_PREFIX}/favorites/${favoriteId}`,
        getListFavorite: `${VERSION_PREFIX}/rpc/favorites/list-by-ids`
    },

    image: {
        createImage: `${VERSION_PREFIX}/images`,
        getImagesByProductId: (refId?: string, type?: string, isMain?: boolean) =>
            isMain !== undefined ?
            `${VERSION_PREFIX}/images/?refId=${refId}&type=${type}&isMain=${isMain}` :
            `${VERSION_PREFIX}/images/?refId=${refId}&type=${type}`,
        getImageById: (imageId: string) =>
            `${VERSION_PREFIX}/images/${imageId}`,
        updateImage: (imageId: string) =>
            `${VERSION_PREFIX}/images/${imageId}`,
        deleteImage: (imageId: string) =>
            `${VERSION_PREFIX}/images/${imageId}`,
    },

    variant: {
        createVariant: `${VERSION_PREFIX}/variations`,
        getVariants: (productId: string) => 
            `${VERSION_PREFIX}/variations/?productId=${productId}`,
        getVariantById: (variantId: string) =>
            `${VERSION_PREFIX}/variations/${variantId}`,
        updateVariant: (variantId: string) =>
            `${VERSION_PREFIX}/variations/${variantId}`,
        deleteVariant: (variantId: string) =>
            `${VERSION_PREFIX}/variations/${variantId}`,
        getListVariant: `${VERSION_PREFIX}/rpc/variations/list-by-ids`,
        getVariantColors: `${VERSION_PREFIX}/variations/color`,
        getVariantSizes: `${VERSION_PREFIX}/variations/size`,
    },

    cart: {
        createCart: `${VERSION_PREFIX}/carts`,
        getCartByUserId: (userId: string) =>
            `${VERSION_PREFIX}/carts/${userId}`,
        updateCart: (cartId: string) =>
            `${VERSION_PREFIX}/carts/${cartId}`,
        deleteCart: (cartId: string) =>
            `${VERSION_PREFIX}/carts/${cartId}`,
    },

    cartItem: {
        createCartItem: `${VERSION_PREFIX}/carts/items`,
        getCartItem: (cartId: string) => `${VERSION_PREFIX}/carts/items/list?cartId=${cartId}`,
        getCartItemById: (cartItemId: string) =>
            `${VERSION_PREFIX}/carts/items/${cartItemId}`,
        updateCartItem: (cartItemId: string) =>
            `${VERSION_PREFIX}/carts/items/${cartItemId}`,
        deleteCartItem: (cartItemId: string) =>
            `${VERSION_PREFIX}/carts/items/${cartItemId}`,
        getListCartItem: `${VERSION_PREFIX}/rpc/carts/items/list-by-ids`
    },

    coupon: {
        createCoupon: `${VERSION_PREFIX}/coupons`,
        getCoupons: `${VERSION_PREFIX}/coupons`,
        getCouponByCondition: (dto: ICouponCondition) => {
            let url = `${VERSION_PREFIX}/coupons?`;
            if (dto.code) {
                url += `code=${dto.code}&`;
            }
            if (dto.type) {
                url += `type=${dto.type}&`;
            }
            return url.slice(0, -1);
        },
        getCouponById: (couponId: string) =>
            `${VERSION_PREFIX}/coupons/${couponId}`,
        updateCoupon: (couponId: string) =>
            `${VERSION_PREFIX}/coupons/${couponId}`,
        deleteCoupon: (couponId: string) =>
            `${VERSION_PREFIX}/coupons/${couponId}`,
        getListCoupon: `${VERSION_PREFIX}/rpc/coupons/list-by-ids`
    },

    order: {
        createOrder: `${VERSION_PREFIX}/orders`,
        getOrders: `${VERSION_PREFIX}/orders`,
        getOrderById: (orderId: string) =>
            `${VERSION_PREFIX}/orders/${orderId}`,
        updateOrder: (orderId: string) =>
            `${VERSION_PREFIX}/orders/${orderId}`,
        deleteOrder: (orderId: string) =>
            `${VERSION_PREFIX}/orders/${orderId}`,
        getListOrder: `${VERSION_PREFIX}/orders/rpc/list-by-ids`
    },

    orderItem: {
        createOrderItem: `${VERSION_PREFIX}/orders/items`,
        getOrderItem: `${VERSION_PREFIX}/orders/items/list`,
        getOrderItemByOrderId: (orderId: string) =>
            `${VERSION_PREFIX}/orders/items/list?orderId=${orderId}`,
        getOrderItemById: (orderItemId: string) =>
            `${VERSION_PREFIX}/orders/items/${orderItemId}`,
        updateOrderItem: (orderItemId: string) =>
            `${VERSION_PREFIX}/orders/items/${orderItemId}`,
        deleteOrderItem: (orderItemId: string) =>
            `${VERSION_PREFIX}/orders/items/${orderItemId}`,
        getListOrderItem: `${VERSION_PREFIX}/rpc/orders/items/list-by-ids`
    },

    orderCoupon: {
        createOrderCoupon: `${VERSION_PREFIX}/orders/coupons`,
        getOrderCoupon: `${VERSION_PREFIX}/orders/coupons/list`,
        getOrderCouponById: (orderCouponId: string) =>
            `${VERSION_PREFIX}/orders/coupons/${orderCouponId}`,
        updateOrderCoupon: (orderCouponId: string) =>
            `${VERSION_PREFIX}/orders/coupons/${orderCouponId}`,
        deleteOrderCoupon: (orderCouponId: string) =>
            `${VERSION_PREFIX}/orders/coupons/${orderCouponId}`,
        getListOrderCoupon: `${VERSION_PREFIX}/rpc/orders/coupons/list-by-ids`
    },

    shipping: {
        createShipping: `${VERSION_PREFIX}/shippings`,
        getShippings: `${VERSION_PREFIX}/shippings`,
        getShippingById: (shippingId: string) =>
            `${VERSION_PREFIX}/shippings/${shippingId}`,
        updateShipping: (shippingId: string) =>
            `${VERSION_PREFIX}/shippings/${shippingId}`,
        deleteShipping: (shippingId: string) =>
            `${VERSION_PREFIX}/shippings/${shippingId}`,
        getListShipping: `${VERSION_PREFIX}/rpc/shippings/list-by-ids`
    },
    
    payment: {
        createPayment: `${VERSION_PREFIX}/payments`,
        getPayments: `${VERSION_PREFIX}/payments`,
        getPaymentById: (paymentId: string) =>
            `${VERSION_PREFIX}/payments/${paymentId}`,
        getPaymentByOrderId: (orderId: string) =>
            `${VERSION_PREFIX}/payments?orderId=${orderId}`,
        updatePayment: (paymentId: string) =>
            `${VERSION_PREFIX}/payments/${paymentId}`,
        deletePayment: (paymentId: string) =>
            `${VERSION_PREFIX}/payments/${paymentId}`,
        getListPayment: `${VERSION_PREFIX}/rpc/payments/list-by-ids`,
        initiatePayment: `${VERSION_PREFIX}/payments/initiate`,
        webhookPayment: (method: string) =>
            `${VERSION_PREFIX}/payments/webhook/${method}`
    },

    rating: {
        createRating: `${VERSION_PREFIX}/ratings`,
        getRatings: `${VERSION_PREFIX}/ratings`,
        getRatingsByProductId: (productId: string) =>
            `${VERSION_PREFIX}/ratings?productId=${productId}`,
        getRatingById: (ratingId: string) =>
            `${VERSION_PREFIX}/ratings/${ratingId}`,
        checkRatingByUserAndProduct: (productId: string) =>
            `${VERSION_PREFIX}/ratings/check-exist/${productId}`,
        updateRating: (ratingId: string) =>
            `${VERSION_PREFIX}/ratings/${ratingId}`,
        deleteRating: (ratingId: string) =>
            `${VERSION_PREFIX}/ratings/${ratingId}`,
        getListRating: `${VERSION_PREFIX}/rpc/ratings/list-by-ids`,
        getAverageRating: (productId: string) =>
            `${VERSION_PREFIX}/ratings/average-rating/${productId}`,
    },

    token: {
        createToken: `${VERSION_PREFIX}/tokens`,
        updateToken: (tokenId: string) =>
            `${VERSION_PREFIX}/tokens/${tokenId}`,
        getListToken: `${VERSION_PREFIX}/tokens/list`,
        activateToken: `${VERSION_PREFIX}/tokens/activate`,
        activationsToken: `${VERSION_PREFIX}/tokens/activations`,
        callbackTransaction: (txHash: string) =>
            `${VERSION_PREFIX}/tokens/callback/transfer/${txHash}`
    }
}