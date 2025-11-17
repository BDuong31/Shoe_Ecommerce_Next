export interface ICart {
    id: string,
    userId: string,
    totalItem: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface ICartCreate {
    userId: string,
}

export interface ICartUpdate {
    totalItem?: number,
}

export interface ICartItem {
    id: string,
    quantity: number,
    cartId: string,
    variantId: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ICartItemCreate {
    quantity: number,
    cartId: string,
    variantId: string,
}

export interface ICartItemUpdate {
    varaintId?: string,
    quantity?: number,
}

export interface IConditionalCartItem {
    cartId?: string,
    variantId?: string,
}