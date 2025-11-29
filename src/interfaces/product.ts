import { IBrand } from "./brand";
import { ICategory } from "./category";
import { IImage } from "./image";
import { IAvgRating } from "./rating";

export interface IProduct {
    id: string;
    productName: string;
    description: string;
    price: number;
    brandId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductDetails extends IProduct {
    brand: IBrand;
    category: ICategory;
    averageRating: IAvgRating;
    images: IImage[];
    isFavorited?: boolean;
}

export interface IProductCreate {
    productName: string,
    price: number,
    description: string,
    brandId: string,
    categoryId: string,
}

export interface IProductUpdate {
    productName?: string;
    price?: number;
    description?: string;
    brandId?: string;
    categoryId?: string;
}

export interface IConditionalProduct {
    productName?: string,
    price?: number,
    description?: string,
    brandId?: string,
    categoryId?: string,
}