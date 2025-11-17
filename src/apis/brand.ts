import { IApiResponse } from "@/interfaces/api-response";
import { IBrand, IBrandCreate, IBrandUpdate } from "@/interfaces/brand";
import axiosInstance, { endpoints } from "@/utils/axios";

export const getBrands = async (): Promise<IApiResponse<IBrand[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.brand.getBrands);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch brands");
    }
}

export const createBrand = async (dto: IBrandCreate): Promise<IApiResponse<IBrand>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.brand.createBrand, dto);
        return data;
    } catch (error) {
        throw new Error("Failed to create brand");
    }
}

export const deleteBrand = async (id: string): Promise<string> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.brand.deleteBrand(id));
        return data;
    } catch (error) {
        throw new Error("Failed to delete brand");
    }
}
export const updateBrand = async (id: string, dto: IBrandUpdate): Promise<IApiResponse<IBrand>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.brand.updateBrand(id), dto);
        return data;
    } catch (error) {
        throw new Error("Failed to update brand");
    }
}