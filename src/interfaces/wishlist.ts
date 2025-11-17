export interface IWishlist {
    id: string;
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IWishlistCreate {
    userId: string;
    productId: string;
}

export interface IWishlistCond {
    userId?: string;
    productId?: string;
}