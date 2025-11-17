import { IApiResponse } from '@/interfaces/api-response';
import { IUserCoupon, IUserCouponCreate, IUserProfile } from '@/interfaces/user';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

// ----------------------------------------------------------------------

interface IGetUserListParams {
  url: string;
  params: Record<string, any>;
}

export const getUserProfile = async () : Promise<IApiResponse<IUserProfile>> => {
    const { data } = await axiosInstance.get(endpoints.user.profile);
    console.log(data);
    return data;
};

export const updateUserProfile = async (
  profileData: Partial<IUserProfile> & { password?: string },
  file: File | null
): Promise<IApiResponse<IUserProfile>> => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  if (profileData) {
    formData.append('fullName', profileData.fullName || '');
    formData.append('email', profileData.email || '');

    if (profileData.phone !== ''){
      formData.append('phone', profileData.phone || '');
    }
    formData.append('gender', profileData.gender || '');
    if (profileData.walletAddress) {
      formData.append('walletAddress', profileData.walletAddress);
    }
  }
  try {
    const { data } = await axiosInstance.patch(endpoints.user.profile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<IApiResponse<void>> => {
  try {
    const { data } = await axiosInstance.patch(endpoints.user.updatePassword, {
      currentPassword,
      newPassword,
    });
    return data;
  } catch (error) {
    console.error('Failed to change password:', error);
    throw error;
  }
};

export const getUserList = async <T>({
  url,
  params,
}: IGetUserListParams): Promise<T> => {
  const { data } = await axios.get<T>(url, {
    params,
  });

  return data;
};

export const getListUser = async (): Promise<IApiResponse<IUserProfile[]>> => {
  const { data } = await axiosInstance.post(endpoints.user.getListUser);
  return data;
}

export const getListUserByIdx = async (idx: string[]): Promise<IApiResponse<IUserProfile[]>> => {
  const { data } = await axiosInstance.post(endpoints.user.getListUser, { idx });
  return data;
}

export const getUserById = async (id: string): Promise<IApiResponse<IUserProfile | null>> => {
  const { data } = await axiosInstance.get(endpoints.user.profileById(id));
  return data;
};

export const getUserCoupons = async (): Promise<IApiResponse<IUserCoupon[]>> => {
  const { data } = await axiosInstance.get(endpoints.user.getUserCoupons);
  return data;
}

export const createUserCoupon = async (dto: IUserCouponCreate): Promise<IApiResponse<string>> => {
  const { data } = await axiosInstance.post(endpoints.user.createUserCoupon, dto);
  return data;
}

export const useUserCoupon = async (couponId: string): Promise<IApiResponse<string>> => {
  const { data } = await axiosInstance.post(endpoints.user.useUserCoupon(couponId));
  return data;
}