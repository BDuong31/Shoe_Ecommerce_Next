import { IApiResponse } from '@/interfaces/api-response';
import { IAddress, IAddressCreate, IAddressUpdate } from '@/interfaces/address';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

export const getAddresses = async (): Promise<IApiResponse<IAddress[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.address.getAddress);
        return data;
    } catch (error) {
        console.error('Failed to fetch addresses:', error);
        throw error;
    }
}

export const getAddressById = async (id: string): Promise<IApiResponse<IAddress>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.address.getAddressById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch address by ID:', error);
        throw error;
    }
}

export const getAddressByCond = async (id: string, isDefault: boolean): Promise<IApiResponse<IAddress[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.address.getAddressByCond(id, isDefault));
        return data;
    } catch (error) {
        console.error('Failed to fetch address by condition:', error);
        throw error;
    }
}
export const createAddress = async (addressData: IAddressCreate): Promise<string> => {
  try {
    const { data } = await axiosInstance.post(endpoints.address.createAddress, addressData);
    return data;
  } catch (error) {
    console.error('Failed to create address:', error);
    throw error;
  }
};

export const updateAddress = async (id: string, addressData: IAddressUpdate): Promise<string> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.address.updateAddress(id), addressData);
        return data;
    } catch (error) {
        console.error('Failed to update address:', error);
        throw error;
    }
}

export const deleteAddress = async (id: string): Promise<string> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.address.deleteAddress(id));
        return data;
    } catch (error) {
        console.error('Failed to delete address:', error);
        throw error;
    }
}