import { IApiResponse } from '@/interfaces/api-response';
import { IAvgRating, IRating, IRatingCreate, IRatingUpdate, IRatingWithUser } from '@/interfaces/rating';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

export const getAllRatings = async (): Promise<IApiResponse<IRatingWithUser[]>>  => {
    try {
        const response = await axiosInstance.get<IApiResponse<IRatingWithUser[]>>(endpoints.rating.getRatings);
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const getRatingsByProductId = async (productId: string): Promise<IApiResponse<IRatingWithUser[]>>  => {
    try {
        const response = await axiosInstance.get<IApiResponse<IRatingWithUser[]>>(endpoints.rating.getRatingsByProductId(productId));
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const getRatingsById = async (productId: string): Promise<IApiResponse<IRatingWithUser[]>>  => {
    try {
        const response = await axiosInstance.get<IApiResponse<IRatingWithUser[]>>(endpoints.rating.getRatingById(productId));
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const getAverageRating = async (productId: string): Promise<IApiResponse<IAvgRating>>  => {
    try {
        const response = await axiosInstance.get<IApiResponse<IAvgRating>>(endpoints.rating.getAverageRating(productId));
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const checkRatingByUserAndProduct = async (productId: string): Promise<IApiResponse<boolean>>  => {
    try {
        const response = await axiosInstance.get<IApiResponse<boolean>>(endpoints.rating.checkRatingByUserAndProduct(productId));
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const createRating = async (ratingData: IRatingCreate): Promise<IApiResponse<IRating>> => {
    try {
        const response = await axiosInstance.post<IApiResponse<IRating>>(endpoints.rating.createRating, ratingData);
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const updateRating = async (ratingId: string, ratingData: IRatingUpdate): Promise<IApiResponse<IRating>> => {
    try {
        const response = await axiosInstance.patch<IApiResponse<IRating>>(endpoints.rating.updateRating(ratingId), ratingData);
        return response.data;
    } catch (error) {
        throw error;    
    }
}

export const deleteRating = async (ratingId: string): Promise<IApiResponse<null>> => {
    try {
        const response = await axiosInstance.delete<IApiResponse<null>>(endpoints.rating.deleteRating(ratingId));
        return response.data;
    } catch (error) {
        throw error;    
    }
}


