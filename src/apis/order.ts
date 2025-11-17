import { IApiResponse } from '@/interfaces/api-response';
import { IOrder, IOrderCondition, IOrderCoupon, IOrderCouponCreate, IOrderCouponUpdate, IOrderCreate, IOrderItem, IOrderItemCreate, IOrderItemUpdate } from '@/interfaces/order';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

export const getOrders = async (): Promise<IApiResponse<IOrder[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.order.getOrders);
        return data;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw error;
    }
}

export const getListOrders = async () : Promise<IApiResponse<IOrder[]>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.order.getListOrder);
        return data;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw error;
    } 
}

export const getOrderById = async (id: string): Promise<IApiResponse<IOrder>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.order.getOrderById(id));
        return data;
    } catch (error) {
        console.error('Failed to fetch order by ID:', error);
        throw error;
    }
}

export const createOrder = async (orderData: IOrderCreate): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.order.createOrder, orderData);
        return data;
    } catch (error) {
        console.error('Failed to create order:', error);
        throw error;
    }
}

export const updateOrderStatus = async (id: string, status: IOrder['status']): Promise<IApiResponse<IOrder>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.order.updateOrder(id), { status });
        return data;
    } catch (error) {
        console.error('Failed to update order status:', error);
        throw error;
    }
}

export const deleteOrder = async (id: string): Promise<IApiResponse<null>> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.order.deleteOrder(id));
        return data;
    } catch (error) {
        console.error('Failed to delete order:', error);
        throw error;
    }
}

export const getOrderItems = async (orderId: string): Promise<IApiResponse<IOrderItem[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.orderItem.getOrderItemById(orderId));
        return data;
    } catch (error) {
        console.error('Failed to fetch order items:', error);
        throw error;
    }
}

export const getOrderItemsByOrderId = async (orderId: string): Promise<IApiResponse<IOrderItem[]>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.orderItem.getOrderItemByOrderId(orderId));
        return data;
    } catch (error) {
        console.error('Failed to fetch order items:', error);
        throw error;
    }
}

export const createOrderItem = async (orderItemData: IOrderItemCreate): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.orderItem.createOrderItem, orderItemData);
        return data;
    } catch (error) {
        console.error('Failed to create order item:', error);
        throw error;
    }
}

export const updateOrderItem = async (id: string, orderItemData: IOrderItemUpdate): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.orderItem.updateOrderItem(id), orderItemData); 
        return data;
    } catch (error) {
        console.error('Failed to update order item:', error);
        throw error;
    }
}

export const deleteOrderItem = async (id: string): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.orderItem.deleteOrderItem(id));
        return data;
    } catch (error) {
        console.error('Failed to delete order item:', error);
        throw error;
    }
}

export const getOrderCoupon = async (orderId: string): Promise<IApiResponse<IOrderCoupon>> => {
    try {
        const { data } = await axiosInstance.get(endpoints.orderCoupon.getOrderCouponById(orderId));
        return data;
    } catch (error) {
        console.error('Failed to fetch order coupon:', error);
        throw error;
    }
}

export const applyCouponToOrder = async (dto: IOrderCouponCreate): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.orderCoupon.createOrderCoupon, dto);
        return data;
    } catch (error) {
        console.error('Failed to apply coupon to order:', error);
        throw error;
    }
}

export const updateOrderCoupon = async (orderCouponId: string, discountApplied: number): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.orderCoupon.updateOrderCoupon(orderCouponId), { discountApplied });
        return data;
    } catch (error) {
        console.error('Failed to update order coupon:', error);
        throw error;
    }
}

export const removeCouponFromOrder = async (id: string): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.orderCoupon.deleteOrderCoupon(id));
        return data;
    } catch (error) {
        console.error('Failed to remove coupon from order:', error);
        throw error;
    }
}
