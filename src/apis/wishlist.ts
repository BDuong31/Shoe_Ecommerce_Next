import { IApiResponse } from "@/interfaces/api-response";
import { IWishlist, IWishlistCreate, IWishlistCond } from "@/interfaces/wishlist";
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from "@/utils/axios";

export const createWishlist = async (dto: IWishlistCreate): Promise<string> => {
    try {
        const { data } = await axiosInstance.post(endpoints.favorite.createFavorite, dto);
        return data;
    } catch (error) {
        console.error('Failed to create wishlist:', error);
        throw error;
    }
}

export const getWishlists = async (cond: IWishlistCond): Promise<IApiResponse<IWishlist[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.favorite.getFavorites, { params: cond });
        return data;
    } catch (error) {
        console.error('Failed to fetch wishlists:', error);
        throw error;
    }
}

export const getWishlistById = async (id: string): Promise<IApiResponse<IWishlist>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.favorite.getFavoriteById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch wishlist by ID:', error);
        throw error;
    }
}

export const getWishlistByCond = async (userId: string, productId: string): Promise<IApiResponse<IWishlist[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.favorite.getFavoriteCondition(userId, productId));
        return data;
    } catch (error) {
        console.error('Failed to fetch wishlist by condition:', error);
        throw error;
    }
}

export const deleteWishlist = async (id: string): Promise<string> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.favorite.deleteFavorite(id));
        return data;
    } catch (error) {
        console.error('Failed to delete wishlist:', error);
        throw error;
    }
}