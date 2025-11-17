import { IApiResponse } from "@/interfaces/api-response";
import { ICart, ICartItem, ICartItemCreate, ICartItemUpdate } from "@/interfaces/cart";
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from "@/utils/axios";

export const getCartByUserId = async (
  userId: string
): Promise<IApiResponse<ICart>> => {
  try {
    const { data } = await axiosInstance.get(
      endpoints.cart.getCartByUserId(userId)
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch cart by user ID:", error);
    throw error;
  }
};

export const createCart = async (
  userId: string
): Promise<IApiResponse<ICart>> => {
  try {
    const { data } = await axiosInstance.post(endpoints.cart.createCart, {
      userId,
    });
    return data;
  } catch (error) {
    console.error("Failed to create cart:", error);
    throw error;
  }
};

export const getCartItemByCartId = async (
  cartId: string
): Promise<IApiResponse<ICartItem[]>> => {
  try {
    const { data } = await axiosInstance.get(
      endpoints.cartItem.getCartItem(cartId)
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch cart items by cart ID:", error);
    throw error;
  }
};

export const createCartItem = async (dto: ICartItemCreate): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.post(endpoints.cartItem.createCartItem, dto);
        return data;
    } catch (error) {
        console.error('Failed to create cart item:', error);
        throw error;
    }
}

export const updateCartItem = async (cartItemId: string, dto: ICartItemUpdate): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.patch(endpoints.cartItem.updateCartItem(cartItemId), dto);
        return data;
    } catch (error) {
        console.error('Failed to update cart item:', error);
        throw error;
    }
}

export const deleteCartItem = async (cartItemId: string): Promise<IApiResponse<string>> => {
    try {
        const { data } = await axiosInstance.delete(endpoints.cartItem.deleteCartItem(cartItemId));
        return data;
    } catch (error) {
        console.error('Failed to delete cart item:', error);
        throw error;
    }
}
