import { IImage } from "./image";
import { IUserProfile } from "./user";

export interface IRating {
    id: string,
    rating: number,
    comment: string,
    userId: string,
    productId: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IRatingWithUser extends IRating {
    user: IUserProfile,
    images?: IImage[],
}

export interface IRatingCreate {
    rating: number,
    comment: string,
    userId: string,
    productId: string,
}

export interface IRatingUpdate {
    rating?: number,
    comment?: string,
}

export interface IConditionalRating {
    rating?: number,
    userId?: string,
    productId?: string,
}

export interface IAvgRating {
    productId: string,
    avgRating: number,
    totalRating: number,
}