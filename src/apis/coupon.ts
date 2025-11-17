import { IApiResponse } from '@/interfaces/api-response';
import { ICoupon, ICouponCondition, ICouponCreate } from '@/interfaces/coupon';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

export const getCoupons = async (): Promise<IApiResponse<ICoupon[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.coupon.getCoupons);
        return data;
    } catch (error) {
        console.error('Failed to fetch coupons:', error);
        throw error;
    }
}

export const getCouponById = async (id: string): Promise<IApiResponse<ICoupon>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.coupon.getCouponById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch coupon by ID:', error);
        throw error;
    }
}

export const createCoupon = async (couponData: ICouponCreate): Promise<string> => {
  try {
    const { data } = await axiosInstance.post(endpoints.coupon.createCoupon, couponData);
    return data;
  } catch (error) {
    console.error('Failed to create coupon:', error);
    throw error;
  }
}

export const deleteCoupon = async (id: string): Promise<string> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.coupon.deleteCoupon(id));
        return data;
    } catch (error) {
        console.error('Failed to delete coupon:', error);
        throw error;
    }
}

export const getCouponByCondition = async (dto: ICouponCondition): Promise<IApiResponse<ICoupon[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.coupon.getCouponByCondition(dto));
        return data;
    } catch (error) {
        console.error('Failed to fetch coupon by code:', error);
        throw error;
    }
}

export const updateCoupon = async (id: string, couponData: Partial<ICouponCreate>): Promise<string> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.coupon.updateCoupon(id), couponData);
        return data;
    } catch (error) {
        console.error('Failed to update coupon:', error);
        throw error;
    }
}  



