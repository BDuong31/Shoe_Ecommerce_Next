import { IApiResponse } from '@/interfaces/api-response';
import { IPayment, IPaymentCreate, IPaymentCondition, IPaymentUpdate, IInitiatePayment } from '@/interfaces/payment';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';
type PaymentGatewayResponse = {
    success: boolean;
    paymentUrl?: string;
}
export const getPayments = async (): Promise<IApiResponse<IPayment[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.payment.getPayments);
        return data;
    } catch (error) {
        console.error('Failed to fetch payments:', error);
        throw error;
    }
}

export const getPaymentById = async (id: string): Promise<IApiResponse<IPayment>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.payment.getPaymentById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch payment by ID:', error);
        throw error;
    }
}

export const getPaymentByOrderId = async (orderId: string): Promise<IApiResponse<IPayment[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.payment.getPaymentByOrderId(orderId));
        return data;
    } catch (error) {
        console.error('Failed to fetch payment by order ID:', error);
        throw error;
    }
}

export const createPayment = async (paymentData: IPaymentCreate): Promise<string> => {
    try {
        const { data } = await axiosInstance.post(endpoints.payment.createPayment, paymentData);
        return data;
    } catch (error) {
        console.error('Failed to create payment:', error);
        throw error;
    }
}

export const updatePayment = async (id: string, paymentData: IPaymentUpdate): Promise<IApiResponse<IPayment>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.payment.updatePayment(id), paymentData);
        return data;
    } catch (error) {
        console.error('Failed to update payment:', error);
        throw error;
    }
}

export const deletePayment = async (id: string): Promise<IApiResponse<null>> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.payment.deletePayment(id));
        return data;
    } catch (error) {
        console.error('Failed to delete payment:', error);
        throw error;
    }
}

export const initiatePayment = async (paymentData: IInitiatePayment): Promise<PaymentGatewayResponse> => {
    try {
        const { data } = await axiosInstance.post(endpoints.payment.initiatePayment, paymentData);
        return data;
    } catch (error) {
        console.error('Failed to initiate payment:', error);
        throw error;
    }
}

