'use client'
import { deleteCartItem } from "@/apis/cart";
import { getCouponByCondition } from "@/apis/coupon";
import { getImages } from "@/apis/image";
import { applyCouponToOrder, createOrder, createOrderItem } from "@/apis/order";
import { createPayment } from "@/apis/payment";
import { createShipping } from "@/apis/shipping";
import { getVariantById } from "@/apis/variant";
import CheckoutDetails from "@/components/checkout/checkoutDetails";
import CheckoutForm from "@/components/checkout/checkoutForm";
import { useCart } from "@/context/cart-context";
import { useUserProfile } from "@/context/user-context";
import { ICoupon } from "@/interfaces/coupon";
import { IImage } from "@/interfaces/image";
import { IOrderCouponCreate, IOrderCreate, IOrderItemCreate } from "@/interfaces/order";
import { IPaymentCreate } from "@/interfaces/payment";
import { IProduct } from "@/interfaces/product";
import { IShippingCreate } from "@/interfaces/shipping";
import { IProductVariant } from "@/interfaces/variant";
import { useRouter } from "next/dist/client/components/navigation";
import React, { use, useEffect } from "react";
import { de } from "zod/v4/locales";

type CheckoutFormData = {
  addressId?: string | null;
  deliveryOption: 'standard' | 'collect';
}


type CheckoutFormProps = {
    amount: number;
    onSubmit?: (data: CheckoutFormData) => void;
}

export default function CheckoutView() {
    const router = useRouter();
    const { userProfile } = useUserProfile();
    const { cart, cartItem,  voucherCode } = useCart();
    const [amount, setAmount] = React.useState<number>(100);
    const [data, setData] = React.useState<CheckoutFormData | null>(null);
    const [coupon, setCoupon] = React.useState<ICoupon>();
    const [images, setImages] = React.useState<Record<string, IImage[]>>({});
    const [variantMap, setVariantMap] = React.useState<Record<string, IProductVariant>>({});
    const [cartTotal, setCartTotal] = React.useState(0);
    const [voucherDiscount, setVoucherDiscount] = React.useState<number>(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = React.useState<number>(0);
    const [deliveryOption, setDeliveryOption] = React.useState<'standard' | 'collect'>('standard');
    const [orderId, setOrderId] = React.useState<string | null>(null);
    const [paymentId, setPaymentId] = React.useState<string | null>(null);
    const handleSubmit = async (data: CheckoutFormData) => {
        console.log('Checkout form submitted with data:', data);
        setData(data);
        const orderData: IOrderCreate = {
            totalAmount: cartTotal,
            userId: userProfile?.id || '',
            shippingAddressId: data.addressId || 'collect_in_store',
        };
        fetcheCreateOrder(orderData);
    }

    useEffect(() => {
        if (orderId && cartItem) {
            const createOrderItems = async () => {
                for (const item of cartItem) {
                    const orderItemData: IOrderItemCreate = {
                        orderId: orderId,
                        variantId: item.variantId,
                        quantity: item.quantity,
                        priceAtPurchase: variantMap[item.variantId]?.product ? (variantMap[item.variantId].product as IProduct).price : 0,
                    };
                    console.log('Creating order item with data:', orderItemData);
                    await fetcheCreateOrderItems(orderItemData);
                    await fetcheDeleteCartItem(item.id);
                }
            }
            createOrderItems();

            if (coupon) {
                const orderCouponData: IOrderCouponCreate = {
                    orderId: orderId,
                    couponId: coupon.id,
                    discountApplied: voucherDiscount,
                }
                console.log('Applying coupon to order with data:', orderCouponData);
                fetcheApplyCouponToOrder(orderCouponData);
            }

            if (data) {
                const PaymentData: IPaymentCreate = {
                    method: 'cod',
                    amount: totalAfterDiscount,
                    orderId: orderId,
                }

                console.log('Creating payment with data:', PaymentData);
                fetcheCreatePayment(PaymentData);
    
                if (data.deliveryOption === 'standard') {
                    const ShippingData: IShippingCreate = {
                        carrier: 'Standard Carrier',
                        trackingNumber: 'TRACK' + Math.floor(Math.random() * 1000000).toString(),
                        shippingCost: 60000,
                        orderId: orderId,
                    }
                    console.log('Creating shipping with data:', ShippingData);
                    fetcheCreateShipping(ShippingData);
                }
            }
        }

        console.log('Order ID changed:', orderId);
        console.log('Payment ID changed:', paymentId);
        if (paymentId && paymentId !== null) {
            router.push(`/payment/${paymentId}`);
        }
    }, [orderId]);

    useEffect(() => {
        console.log('Payment ID changed:', paymentId);
        if (paymentId && paymentId !== null) {
            router.push(`/payment/${paymentId.id}`);
        }
    }, [paymentId]);

    const fetcheCreateOrder = async (orderData: IOrderCreate) => {
        try {
            const response = await createOrder(orderData);
            return setOrderId(response.data);
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    }

    async function fetcheCreateOrderItems(orderItemData: IOrderItemCreate) {
        try {
            const response = await createOrderItem(orderItemData);
            return response.data;
        } catch (error) {
            console.error('Error creating order item:', error);
            return null;
        }
    }

    async function fetcheApplyCouponToOrder(orderCouponData: IOrderCouponCreate) {
        try {
            const response = await applyCouponToOrder(orderCouponData);
            return response.data;
        } catch (error) {
            console.error('Error applying coupon to order:', error);
            return null;
        }
    }

    async function fetcheCreatePayment(PaymentData: IPaymentCreate) {
        console.log('Creating payment...');
        try {
            const response = await createPayment(PaymentData);
            setPaymentId(response);  
        } catch (error) {
            console.error('Error creating payment:', error);
            return null;
        }
    }
    const fetcheCreateShipping = async (ShippingData: IShippingCreate) => {
        try {
            const response = await createShipping(ShippingData);
            return response.data;   
        } catch (error) {
            console.error('Error creating shipping:', error);
            return null;
        }
    }

    async function fetcheDeleteCartItem(cartItemId: string) {
        try {
            const response = await deleteCartItem(cartItemId);
            return response.data;   
        } catch (error) {
            console.error('Error deleting cart item:', error);
            return null;
        }
    }

    const fetcheVarants = async (variantId: string) => {
        try {
            const response = await getVariantById(variantId);
            return response.data;
        } catch (error) {
            console.error('Error fetching variant:', error);
            return null;
        }
    }

    const fetcheImages = async (productId: string) => {
        try {
            const response = await getImages(productId)
            setImages(prevImages => ({...prevImages, [productId]: response.data }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    const fetcheCoupon = async (code: string) => {
        try {
            const response = await getCouponByCondition({ code });
            setCoupon(response.data[0]);
        } catch (error) {
            console.error('Error fetching coupon:', error);
        }
    }

    const checkCouponValidity = (coupon: ICoupon) => {
        console.log('Checking validity for coupon:', coupon);
        const currentDate = new Date();
        if (coupon.expiryDate && new Date(coupon.expiryDate) < currentDate) {
            return false;
        }
        return true;
    }

    const handleDeliveryOptionChange = (option: 'standard' | 'collect') => {
        setDeliveryOption(option);
        console.log('Delivery option changed to:', option);
    };

    React.useEffect(() => {
        if (voucherCode) {
            fetcheCoupon(voucherCode);
        } else {
            setCoupon(undefined);
        }
    }, [voucherCode]);

    React.useEffect(() => {
        const fetchAllVariants = async () => {
            if (cartItem && cartItem.length > 0) {
                cartItem.forEach(async (item) => {
                    const variantData = await fetcheVarants(item.variantId);
                    if (variantData) {
                        setVariantMap(prevMap => ({ ...prevMap, [item.variantId]: variantData }));
                    }
                });
            }
        }
        fetchAllVariants();
    }, [cartItem])

    React.useEffect(() => {
        if (Object.keys(variantMap).length > 0) {
            if (cartItem && cartItem.length > 0) {
                cartItem.forEach((item) => {
                    const variant = variantMap[item.variantId];
                    if (variant) {
                        fetcheImages(variant.productId);
                    }
                });
            }
        }
    }, [variantMap]);

    React.useEffect(() => {
        if (!cartItem || !variantMap) {
            setCartTotal(0);
            return;
        } 

        const cartTotal = cartItem.reduce((total, item) => {
            const variant = variantMap[item.variantId];
            if (variant) {
                const product = variant.product as IProduct;

                if (product) {
                    const price = product.price;
                    total += price * item.quantity;
                } else {
                    console.warn(`Product not found for variant ID: ${item.variantId}`);
                }
            } else {
                console.warn(`Variant not found for variant ID: ${item.variantId}`);
            }
            return total;
        }, 0)
        setCartTotal(cartTotal);
    }, [cartItem, variantMap]);

    React.useEffect(() => {
        if (coupon && checkCouponValidity(coupon)) {
            let discount = 0;
            if (coupon.type === 'percentage' && coupon.discountValue) {
                discount = (coupon.discountValue / 100) * cartTotal;
            } else if (coupon.type === 'fixed' && coupon.discountValue) {
                discount = coupon.discountValue;
            }

            const totalAfferDelivery = deliveryOption === 'standard' ? cartTotal + 60000 : cartTotal;

            setVoucherDiscount(discount);
            setTotalAfterDiscount(totalAfferDelivery - discount);
        } else {
            setVoucherDiscount(0);
            const totalAfferDelivery = deliveryOption === 'standard' ? cartTotal + 60000 : cartTotal;
            setTotalAfterDiscount(totalAfferDelivery);
        }
    }, [coupon, cartTotal, deliveryOption]);
    
    return (
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10">
            <div className="h-auto lg:grid grid-cols-2 gap-10">
                
                <div className='h-fit mt-8 lg:mt-0'>
                    <CheckoutForm onSubmit={handleSubmit}  onChangeDeliveryOption={handleDeliveryOptionChange} />
                </div>

                <div className='h-auto relative mt-8 lg:mt-0'>
                    <div className="lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full lg:overflow-hidden">
                        <CheckoutDetails cartTotal={cartTotal} cartCount={cart?.totalItem} deliveryFee={deliveryOption === 'standard' ? 60000 : 0}  voucherDiscount={voucherDiscount} totalAfterDiscount={totalAfterDiscount} variantMap={variantMap} images={images} />
                    </div>
                </div>

            </div>
        </div>
    )
}