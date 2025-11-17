import { IApiResponse } from "@/interfaces/api-response";
import { ICategory, ICategoryCreate, ICategoryUpdate } from "@/interfaces/category";
import axiosInstance, { endpoints } from "@/utils/axios";

export const getCategories = async (): Promise<IApiResponse<ICategory[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.category.getCategories);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch categories");
    }
}

export const getCategoriesById = async (id: string): Promise<IApiResponse<ICategory>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.category.getCategoryById(id));
        return data;
    } catch (error) {
        throw new Error("Failed to fetch category by ID");
    }
}

export const createCategory = async (dto: ICategoryCreate): Promise<IApiResponse<ICategory>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.category.createCategory, dto);
        return data;
    } catch (error) {
        throw new Error("Failed to create category");
    }
}

export const deleteCategory = async (id: string): Promise<string> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.category.deleteCategory(id));
        return data;
    } catch (error) {
        throw new Error("Failed to delete category");
    }
}
export const updateCategory = async (id: string, dto: ICategoryUpdate): Promise<IApiResponse<ICategory>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.category.updateCategory(id), dto);
        return data;
    } catch (error) {
        throw new Error("Failed to update category");
    }
}