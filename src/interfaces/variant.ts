import { IProduct } from "./product";

export interface IProductVariant {
    id: string,
    size: number,
    color: string,
    sku: string,
    quantity: number,
    productId: string,
    createdAt: Date,
    updatedAt: Date,
    product?: IProduct,
}

export interface IVariantCreate {
    size: number,
    color: string,
    sku: string,
    quantity: number,
    productId: string,
}
export interface IVariantUpdate {
    size: number,
    color: string,
    sku: string,
    quantity: number,
}

export interface IConditionalVariant {
    size?: number,
    color?: string,
    sku?: string,
    productId?: string,
}