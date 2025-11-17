import { IApiResponse } from '@/interfaces/api-response';
import { IShipping, IShippingCreate, IShippingCondition, IShippingUpdate } from '@/interfaces/shipping';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

export const getShippings = async (): Promise<IApiResponse<IShipping[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.shipping.getShippings);
        return data;
    } catch (error) {
        console.error('Failed to fetch shippings:', error);
        throw error;
    }
}

export const getShippingById = async (id: string): Promise<IApiResponse<IShipping>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.shipping.getShippingById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch shipping by ID:', error);
        throw error;
    }
}

export const createShipping = async (shippingData: IShippingCreate): Promise<IApiResponse<IShipping>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.shipping.createShipping, shippingData);
        return data;
    } catch (error) {
        console.error('Failed to create shipping:', error);
        throw error;
    }
}   

export const updateShipping = async (id: string, shippingData: IShippingUpdate): Promise<IApiResponse<IShipping>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.shipping.updateShipping(id), shippingData);
        return data;
    } catch (error) {
        console.error('Failed to update shipping:', error);
        throw error;
    }
}

export const deleteShipping = async (id: string): Promise<IApiResponse<null>> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.shipping.deleteShipping(id));
        return data;
    } catch (error) {
        console.error('Failed to delete shipping:', error);
        throw error;
    }
}