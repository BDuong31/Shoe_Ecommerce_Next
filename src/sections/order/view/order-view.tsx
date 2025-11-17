'use client';
import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaArrowLeft, FaClipboardList, FaMoneyCheckAlt, 
  FaShippingFast, FaBoxOpen, FaStar 
} from 'react-icons/fa';
import ArrowBack from '@/components/icons/arrow-back';
import { ChevronLeft } from 'lucide-react';
import ClipboardRegular from '@/components/icons/clipboard';
import OrderItem from '@/components/order/order-item';
import { orders } from '@/sections/purchase/data/purchase';
import { IOrder, IOrderCoupon, IOrderItem } from '@/interfaces/order';
import { getOrderById, getOrderCoupon, getOrderItems, getOrderItemsByOrderId } from '@/apis/order';
import { getPaymentById, getPaymentByOrderId } from '@/apis/payment';
import { IPayment } from '@/interfaces/payment';
import { IAddress } from '@/interfaces/address';
import { create } from 'domain';
import { createAddress, getAddressByCond, getAddressById } from '@/apis/address';
import { useUserProfile } from '@/context/user-context';
import { IProductVariant } from '@/interfaces/variant';
import { getVariantById } from '@/apis/variant';
import { is } from 'zod/v4/locales';
import { useRouter } from 'next/navigation';

type OrderDetailPageProps = {
    id: string;
};

const stepsToAddress: { name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Order Placed', icon: FaClipboardList },
  { name: 'Payment Info Confirmed', icon: FaMoneyCheckAlt },
  { name: 'Order Shipped Out', icon: FaShippingFast },
  // { name: 'Order Received', icon: FaBoxOpen },
  { name: 'Order Completed', icon: FaStar },
];

const stepsToCollection: { name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Order Placed', icon: FaClipboardList },
  { name: 'Payment Info Confirmed', icon: FaMoneyCheckAlt },
  { name: 'Order Completed', icon: FaStar },
];

const orderStatusesToAddress = ['Processing', 'Shipped', 'Delivered', 'Completed', 'Canceled'];
const orderStatusesCollection = ['Processing', 'Completed', 'Canceled'];
export default function OrderView({ id }: OrderDetailPageProps) {
  const router = useRouter();
  const { userProfile} = useUserProfile()
   const [order, setOrder] = React.useState<IOrder | null>(null);
   const [orderCoupon, setOrderCoupon] = React.useState<IOrderCoupon | null>(null);
   const [orderItems, setOrderItems] = React.useState<IOrderItem[]>([]);
   const [variantMap, setVariantMap] = React.useState<Map<string, IProductVariant>>(new Map());
   const [payment, setPayment] = React.useState<IPayment | null>(null);
   const [stepsOrder, setStepsOrder] = React.useState<{ name: string; icon: React.ComponentType<{ className?: string }> }[]>([]);
   const [isAddress, setIsAddress] = React.useState<boolean>(true);
   const [address, setAddress] = React.useState<IAddress | null>(null);

   const [total, setTotal] = React.useState<number>(0);
   const [discount, setDiscount] = React.useState<number>(0);
   const [deliveryFee, setDeliveryFee] = React.useState<number>(0);
   const [totalPayment, setTotalPayment] = React.useState<number>(0);

  const fetchOrderById = async (id: string) => {
    try {
      const response = await getOrderById(id);
      setOrder(response.data);
    }  catch (error) {
      console.error('Error fetching order by ID:', error);
    }
  }

  const fetchOrderCouponById = async (orderId: string) => {
    try {
      const response = await getOrderCoupon(orderId);
      setOrderCoupon(response.data);
    } catch (error) {
      console.error('Error fetching order coupon by order ID:', error);
    }
  }

  const fetcheOrderItem = async (orderId: string) => {
    try {
      const response = await getOrderItemsByOrderId(orderId);
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items by order ID:', error);
    }
  }

  const fetcheVariant = async (varinatId: string) => {
    try {
      const response = await getVariantById(varinatId);
      const variantData = response.data;
      setVariantMap((prev) => new Map(prev).set(varinatId, variantData));
    } catch (error) {
      console.error('Error fetching variant by ID:', error);
    }
  } 

  const fetchePaymentById = async (id: string) => {
    try {
      const response = await getPaymentByOrderId(id);
      setPayment(response.data[0]);
    } catch (error) {
      console.error('Error fetching payment by order ID:', error);
    }
  }

  const fetcheGetAddress = async (addressId: string) => {
    try {
      const response = await getAddressById(addressId);
      setAddress(response.data);
    } catch (error) {
      console.error('Error fetching address by ID:', error);
    }
  }

  React.useEffect(() => {
    fetchOrderById(id);
    fetchePaymentById(id);
    fetchOrderCouponById(id);
  }, [id]);

  React.useEffect(() => {
    if (order) {
      if (order.shippingAddressId === 'collect_in_store') {
        setIsAddress(false);
        setStepsOrder(stepsToCollection);
      } else {
        setIsAddress(true);
        setStepsOrder(stepsToAddress);
      }
      fetcheOrderItem(order.id);
    }
  }, [order]);

  React.useEffect(() => {
    if (order && order.shippingAddressId && order.shippingAddressId !== 'collect_in_store') {
      fetcheGetAddress(order.shippingAddressId);
    }
  }, [order]);

  React.useEffect(() => {
    if (orderItems) {
      orderItems.forEach((item) => {
        fetcheVariant(item.variantId);
      });
    }
  }, [orderItems]);

  const currentStep = React.useMemo(() => {
    if (!order) return 0;
    if (!payment) return 0;
    if (isAddress) {
      if (payment?.status === 'success' && order.status === 'Processing') {
        return orderStatusesToAddress.indexOf(order.status) + 1;
      } else { 
        return orderStatusesToAddress.indexOf(order.status);
      }
    } else {
      if (payment?.status === 'success' && order.status === 'Processing') {
        return orderStatusesCollection.indexOf(order.status) + 1;
      } else { 
        return orderStatusesCollection.indexOf(order.status);
      }
    }
  }, [order, payment, isAddress]);

  React.useEffect(() => {
    if (order) {
      setTotal(order.totalAmount);
    }
    if (orderCoupon) {
      setDiscount(orderCoupon.discountApplied);
    }
    if (order && order.shippingAddressId === 'collect_in_store') {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(60000);
    }
    if (order) {
      if (orderCoupon) {
        if (order.shippingAddressId === 'collect_in_store') {
          setTotalPayment((order.totalAmount ?? 0) - (orderCoupon.discountApplied ?? 0) + 0);
        } else {
          setTotalPayment((order.totalAmount ?? 0) - (orderCoupon.discountApplied ?? 0) + 60000);
        }
      } else {
        if (order.shippingAddressId === 'collect_in_store') {
          setTotalPayment((order.totalAmount ?? 0) + 0);
        } else {
          setTotalPayment((order.totalAmount ?? 0) + 60000);
        }
      }
    }
  }, [order, payment, address, orderCoupon]);
  return (
    <div className="rounded-lg bg-fawhite w-full p-6">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <Link href="/user/purchase" className="btn btn-ghost">
            <ChevronLeft /> Back
          </Link>
          <div className="flex justify-center items-center gap-1 text-right">
            <span className="text-sm text-gray-600">Order ID: {order?.id}</span>
            <h1 className="text-2xl font-bold uppercase">{order?.status}</h1>
          </div>
        </div>

        <div className="p-8 rounded-lg mb-6">
          <div className="flex items-center w-full px-6">
              {stepsOrder.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = index <= currentStep;
                const isLineCompleted = index < currentStep;
                const isLastStep = index === stepsOrder.length - 1;
                let iconColor = 'text-gray';
                let circleColor = 'border-gray border-[0.25rem]';
                let lineColor = 'bg-gray';

                if (isCompleted) {
                  iconColor = 'text-[#22C55E]';
                  circleColor = 'bg-transparent border-[0.25rem] border-[#22C55E]';
                  if (isLineCompleted) {
                    lineColor = 'bg-[#22C55E]';
                  }
                }
                
                if (isLastStep) {
                  if (isCompleted) {
                    iconColor = 'text-[#22C55E]';
                    circleColor = 'bg-transparent border-[0.25rem] border-[#22C55E]';
                  } else {
                    iconColor = 'text-gray';
                    circleColor = 'bg-white border-[0.25rem] border-gray';
                  }
                }

                return (
                  <React.Fragment key={step.name}>
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${circleColor}`}>
                        <IconComponent className={`w-6 h-6 ${iconColor}`} />
                      </div>
                    </div>
                    
                    {!isLastStep && (
                      <div className={`flex-auto h-1 ${lineColor}`} />
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          <div className="flex justify-between w-full mt-2">
            {stepsOrder.map((step) => (
              <div key={step.name} className="text-center w-24">
                <span className="font-semibold text-sm">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-lg mb-6">
          <div>
            {orderItems && variantMap &&
              orderItems.map((item: IOrderItem) => {
                const variantData = variantMap.get(item.variantId);
                return (
                  <>
                   <OrderItem key={item.variantId}  item={item} variant={variantData!} />
                   <div className="divider my-1"></div>
                  </>
                );
              })
            }
          </div>
        </div>

        <div className="p-8 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2">Recipient Information</h3>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span>{userProfile?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{userProfile?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Full Name</span>
                <span>{userProfile?.fullName}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address</span>
                <span className="text-right">{customerInfo?.deliveryAddress}</span>
              </div> */}
              {isAddress && address && (
                <div className="space-y-3 mt-3">
                  <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                  <p className="text-graymain">
                    {address.fullName}
                  </p>
                  <p className="text-graymain">
                    {address.phone}
                  </p>
                  <p className="text-graymain">
                    {address.streetAdress}, {address.cityProvince}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
              <div className="flex justify-between">
                <span className="text-gray-500">Merchandise Subtotal</span>
                <span>${total?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span>{deliveryFee === 0 ? '-' : `$${(deliveryFee ?? 0).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sales Tax</span>
                <span>{discount === 0 ? '-' : `$${(discount ?? 0).toFixed(2)}`}</span>
              </div>
              <div className="divider my-1"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  ${(totalPayment ?? 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-semibold">
                  {
                    payment?.method === 'cod' ? 'Cash on Delivery' :
                    payment?.method === 'vnpay-VNPAYQR' ? 'VNPay Banking Apps and E-wallets' :
                    payment?.method === 'vnpay-VNBANK' ? 'VNPay Domestic card and bank account' : 
                    payment?.method === 'vnpay-INTCARD' ? 'VNPay International payment cards' :
                    payment?.method === 'vnpay-VNMART' ? 'VNPAY e-Money' :
                    payment?.method === 'momo-captureWallet' ? 'MoMo E-wallet' :
                    payment?.method === 'momo-payWithVTS' ? 'MoMo Postpaid Wallet' :
                    payment?.method === 'momo-payWithATM' ? 'MoMo ATM Card' :
                    payment?.method === 'momo-payWithCC' ? 'MoMo Credit Card' : 
                    payment?.method === 'zalopay-qr' ? 'ZaloPay QR Code' :
                    payment?.method === 'zalopay-cc' ? 'ZaloPay Credit Card' :
                    payment?.method === 'zalopay-vietqr' ? 'ZaloPay VietQR' :
                    payment?.method === 'zalopay-atm-one-form' ? 'ZaloPay ATM One Form' : ''
                  }
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">Payment Status</span>
                <span className="font-semibold">
                  {
                    payment?.status === 'success' ? 'Successful Payment' :
                    payment?.status === 'pending' ? 'Waiting For Payment' :
                    payment?.status === 'failed' ? 'Payment Failed' : ''
                  }
                </span>
              </div>
              {payment && (payment.status === 'failed' || payment.status === 'pending') && payment.method !== 'cod' && order && order.status !== 'Canceled' &&
                <div className="flex justify-end">
                  <button
                    className='text-blue'
                    onClick={() => {
                      router.push(`/payment/${payment?.id}`);
                    }}
                  >
                    RePayment
                  </button>
                </div>
              }
              {
                order && order?.status === 'Completed' && (
                  <div className="flex justify-end">
                    <button
                      className='text-[#FF0000]'
                      onClick={() => {
                        console.log('Cancellation and Refund Process Initiated');
                      }}
                    >
                      Cancel and Refund
                    </button>
                  </div>
                )
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}