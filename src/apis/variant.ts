import { IApiResponse } from "@/interfaces/api-response";
import { IProductVariant } from "@/interfaces/variant";
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from "@/utils/axios";

export const getVariants = async (productId: string): Promise<IApiResponse<IProductVariant[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.variant.getVariants(productId));
        return data;
    } catch (error) {
        console.error('Failed to fetch variants:', error);
        throw error;
    }
}

export const getVariantById = async (id: string): Promise<IApiResponse<IProductVariant>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.variant.getVariantById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch variant by ID:', error);
        throw error;
    }
}

export const createVariant = async (variantData: Partial<IProductVariant>): Promise<string> => {
  try {
    const { data } = await axiosInstance.post(endpoints.variant.createVariant, variantData);
    return data;
  } catch (error) {
    console.error('Failed to create variant:', error);
    throw error;
  }
}

export const updateVariant = async (id: string, variantData: Partial<IProductVariant>): Promise<string> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.variant.updateVariant(id), variantData);
        return data;
    } catch (error) {
        console.error('Failed to update variant:', error);
        throw error;
    }
}

export const deleteVariant = async (id: string): Promise<string> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.variant.deleteVariant(id));
        return data;
    } catch (error) {
        console.error('Failed to delete variant:', error);
        throw error;
    }
}

export const getVariantColors = async (): Promise<IApiResponse<string[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.variant.getVariantColors);
        return data;
    } catch (error) {
        console.error('Failed to fetch variant colors:', error);
        throw error;
    }
}

export const getVariantSizes = async (): Promise<IApiResponse<number[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.variant.getVariantSizes);
        return data;
    } catch (error) {
        console.error('Failed to fetch variant sizes:', error);
        throw error;
    }
}