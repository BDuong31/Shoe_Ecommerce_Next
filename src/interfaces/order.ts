

export interface IOrder {
    id: string;
    totalAmount: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Completed' | 'Canceled';
    userId: string;
    shippingAddressId: string | null;
    createdAt: Date,
    updatedAt: Date,
}

export interface IOrderCreate {
    totalAmount: number;
    userId: string;
    shippingAddressId?: string | null;
}

export interface IOrderUpdate {
    status?: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
}

export interface IOrderCondition {
    userId?: string;
    status?: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
    shippingAddressId?: string | null;
}

export interface IOrderItem {
    id: string;
    quantity: number;
    priceAtPurchase: number;
    orderId: string;
    variantId: string;
    createdAt: Date,
    updatedAt: Date,
}

export interface IOrderItemCreate {
    quantity: number;
    priceAtPurchase: number;
    orderId: string;
    variantId: string;
}

export interface IOrderItemUpdate {
    quantity?: number;
    priceAtPurchase?: number;
}

export interface IOrderItemCondition {
    orderId?: string;
    variantId?: string;
}

export interface IOrderCoupon {
    id: string;
    discountApplied: number;
    orderId: string;
    couponId: string;
    createdAt: Date,
    updatedAt: Date,
}

export interface IOrderCouponCreate {
    discountApplied: number;
    orderId: string;
    couponId: string;
}

export interface IOrderCouponUpdate {
    discountApplied?: number;
}

export interface IOrderCouponCondition {
    orderId?: string;
    couponId?: string;
}