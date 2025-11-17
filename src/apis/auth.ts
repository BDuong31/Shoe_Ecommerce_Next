import { IApiResponse } from '@/interfaces/api-response';
import axiosInstance, { endpoints } from '@/utils/axios';

//-------------------------------------------------------------------------------------------

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  avatar?: string | null;
  fullName: string | undefined;
  gender?: string | null;
  email: string | null | undefined;
  password: string | undefined;
}

interface LoginResponse {
  data: string;
}

interface introspectParams {
  token: string
}

interface introspectResponse {
  sub: string;
  role: string;
}
export const login = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
  const response = await axiosInstance.post(endpoints.auth.login, {
    email,
    password,
  });
  return response.data;
}

export const register = async (params: RegisterParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.register, params);
  return response.data;
};

export const introspect = async (params: introspectParams ): Promise<introspectResponse> => {
  const response = await axiosInstance.post(endpoints.auth.introspect, params)
  return response.data.data
}