'use client';
import { ErrorCircleBold } from "@/components/icons/error-circle";
import React from "react";
import Link from "next/link";
import { BagRemoveBold } from "@/components/icons/bag-remove";
import { BagCheckBold } from "@/components/icons/bag-check";
import { useSearchParams } from "next/navigation";
import { IOrder } from "@/interfaces/order";
import { IPayment, IPaymentUpdate } from "@/interfaces/payment";
import { getPaymentById, updatePayment } from "@/apis/payment";
import { getOrderById } from "@/apis/order";
import SplashScreen from "@/components/loading/splash-sceen";
type PaymentResultViewProps = {
    id: string;
};
export default function PaymentResultView({ id }: PaymentResultViewProps) {
    const searchParams = useSearchParams();
    const resultCode = searchParams?.get('resultCode');
    const return_code = searchParams?.get('return_code');
    const vnp_ResponseCode = searchParams?.get('vnp_ResponseCode');
    const [payment, setPayment] = React.useState<IPayment | null>(null);
    const [order, setOrder] = React.useState<IOrder | null>(null);
    const [status, setStatus] = React.useState<'success' | 'failed' | 'pending'>('success');
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        if (resultCode === '0' || return_code === '00' || vnp_ResponseCode === '00') {
            setStatus('success');
        } else if (resultCode === '-1') {
            setStatus('pending');
        } else {
            setStatus('failed');
        }
    }, [resultCode, return_code, vnp_ResponseCode]);

    const fetchPayment = async (paymentId: string) => {
        setLoading(true);
        try {
            const response = await getPaymentById(paymentId);
            if (response) {
                setPayment(response.data);
            }
        } catch (error) {
            console.error('Error fetching payment:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchePaymentUpdate = async (paymentId: string, dto: IPaymentUpdate) => {
        setLoading(true);
        try {
            const response = await updatePayment(paymentId, dto);
            if (response) {
                setPayment(response.data);
            }   
        } catch (error) {
            console.error('Error updating payment:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrder = async (orderId: string) => {
        setLoading(true);
        try {
            const response = await getOrderById(orderId);
            if (response) {
                setOrder(response.data);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchPayment(id);
    }, [id]);

    React.useEffect(() => {
        if (payment?.orderId) {
            fetchOrder(payment.orderId);
        }
    }, [payment]);

    React.useEffect(() => {
        if (payment && status === 'success' && payment.status !== 'completed') {
            fetchePaymentUpdate(id, { status: 'success' });
        } else if (payment && status === 'failed' && payment.status !== 'failed') {
            fetchePaymentUpdate(id, { status: 'failed' });
        } else if (payment && status === 'pending' && payment.status !== 'pending') {
            fetchePaymentUpdate(id, { status: 'pending' });
        }
    }, [payment, status]);

    if (loading) {
        return <SplashScreen className="h-[80vh]"/>;
    }

    if (status === 'failed') {
        return (
            <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] pt-10">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 mb-12">
                        PAYMENT FAILED
                    </h1>
                    <div className="flex flex-col w-full gap-auto justify-center items-center p-12">
                        <div className="p-5">
                            <ErrorCircleBold width={100} height={100} />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-900 p-5">
                            Your Payment Could Not Be Processed
                        </h2>

                        <p className="text-graymain p-5">
                            Unfortunately, we were unable to process your payment for order <span className="font-bold text-gray-900">#{order?.id}</span>. Please try again with another payment method or contact your bank for assistance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full p-5">
                            <Link className="w-full py-3 px-6 rounded-lg border border-graymain font-semibold text-center transition-all" href="/" passHref>
                                BACK TO HOME
                            </Link>
                            <Link className="w-full py-3 px-6 rounded-lg bg-[#000000] text-white font-semibold text-center transition-all hover:bg-gray-800" href="/checkout" passHref>
                                TRY AGAIN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'pending') {
        return (
            <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] pt-10">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 mb-12">
                        PAYMENT PENDING
                    </h1>
                    <div className="flex flex-col w-full gap-auto justify-center items-center p-12">
                        <div className="p-5">
                            <BagRemoveBold width={100} height={100} />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-900 p-5">
                            Your Payment is Being Processed
                        </h2>

                        <p className="text-graymain p-5">
                            Your payment for order <span className="font-bold text-gray-900">#{id}</span> is currently pending. We will notify you once the payment has been successfully processed.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full p-5">
                            <Link className="w-full py-3 px-6 rounded-lg border border-graymain font-semibold text-center transition-all" href="/" passHref>
                                BACK TO HOME
                            </Link>
                            <Link className="w-full py-3 px-6 rounded-lg bg-[#000000] text-white font-semibold text-center transition-all hover:bg-gray-800" href={`/user/purchase/order/${order?.id}`} passHref>
                                CHECK ORDER STATUS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] pt-10">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 mb-12">
                        PAYMENT COMPLETE
                    </h1>
                    <div className="flex flex-col w-full gap-auto justify-center items-center p-12">
                        <div className="p-5">
                            <BagCheckBold width={100} height={100} />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-900 p-5">
                             Your Order Is Completed 
                        </h2>

                        <p className="text-graymain p-5">
                            Thank You For Your Order <span className="font-bold text-gray-900">#{order?.id}</span>! Your Order Is Being Processed And Will Be Completed Within 3-6 Hours. You Will Receive An Email Confirmation When Your Order Is Completed.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full p-5">
                            <Link className="w-full py-3 px-6 rounded-lg border border-graymain font-semibold text-center transition-all" href="/" passHref>
                                CONTINUE SHOPPING
                            </Link>
                            <Link className="w-full py-3 px-6 rounded-lg bg-[#000000] text-white font-semibold text-center transition-all hover:bg-gray-800" href={`/user/purchase/order/${order?.id}`} passHref>
                                VIEW YOUR ORDER
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}