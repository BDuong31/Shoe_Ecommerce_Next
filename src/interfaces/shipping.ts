export interface IShipping {
    id: string,
    carrier: string,
    trackingNumber: string,
    shippingCost: number,
    orderId: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IShippingCreate {
    carrier: string,
    trackingNumber: string,
    shippingCost: number,
    orderId: string,
}

export interface IShippingUpdate {
    carrier?: string,
    trackingNumber?: string,
    shippingCost?: number,
}

export interface IShippingCondition {
    carrier?: string,
    orderId?: string,
}