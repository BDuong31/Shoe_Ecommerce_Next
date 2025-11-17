// app/profile/purchase/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image'; 
import { orders, product } from '@/sections/purchase/data/purchase';
import OrderCard from '@/components/order/order-card';
import { IOrder, IOrderItem } from '@/interfaces/order';
import { getOrderItemsByOrderId, getOrders } from '@/apis/order';
import { getPaymentByOrderId, getPayments } from '@/apis/payment';
import { IProductVariant } from '@/interfaces/variant';
import { IPayment } from '@/interfaces/payment';
import { getVariantById } from '@/apis/variant';

export default function PurchasePage() {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [listOrder, setListOrder] = useState<IOrder[] | null>(orders);
  const [orderItemsMap, setOrderItemsMap] = useState<Map<string, IOrderItem[]>>(new Map());
  const [variantMap, setVariantMap] = useState<Map<string, IProductVariant>>(new Map());
  const [paymentsMap, setPaymentsMap] = useState<Map<string, IPayment>>(new Map());
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'To Pay', 'To Ship', 'To Receive', 'Completed', 'Canceled'];
  const hiddenTabs = ['all', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Canceled'];

  const fetchedOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  const fetchOrderItemsByOrderId = async (id: string) => {
    try {
      const response = await getOrderItemsByOrderId(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching order items by order ID:', error);
      return null;
    }
  }

  const fetchVariant = async (id: string) => {
    try {
      const response = await getVariantById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching variant by ID:', error);
      return null;
    }
  }

  const fetchePaymentById = async (id: string) => {
    try {
      const response = await getPaymentByOrderId(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment by order ID:', error);
      return null;
    }
  }

  React.useEffect(() => {
    fetchedOrders();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      if (orders) {
        const orderItemsMapTemp = new Map<string, IOrderItem[]>();
        const variantMapTemp = new Map<string, IProductVariant>();
        const paymentsMapTemp = new Map<string, IPayment>();

        for (const order of orders) {
          const orderItems = await fetchOrderItemsByOrderId(order.id);
          if (orderItems) {
            orderItemsMapTemp.set(order.id, orderItems);

            for (const item of orderItems) {
              if (!variantMapTemp.has(item.variantId)) {
                const variant = await fetchVariant(item.variantId);
                if (variant) {
                  variantMapTemp.set(item.variantId, variant);
                }
              }
            }
          }

          const payment = await fetchePaymentById(order.id);
          if (payment) {
            paymentsMapTemp.set(order.id, payment[0]);
          }
        }

        setOrderItemsMap(orderItemsMapTemp);
        setVariantMap(variantMapTemp);
        setPaymentsMap(paymentsMapTemp);
      }
    };

    fetchData();
  }, [orders]);

  React.useEffect(() => {
    filterOrder(activeTab);
  }, [orders]);

  const filterOrder = (status: string) => {
    const index = tabs.findIndex(tab => tab === status);
    if (status === 'All') {
      setListOrder(orders);
    } else {
      const filtered = orders?.filter(order => order.status === hiddenTabs[index]);
      setListOrder(filtered ?? null);
    }
  }

  React.useEffect(() => {
    console.log('Active Tab changed to:', activeTab);
    filterOrder(activeTab);
    console.log('List of orders after filtering:', listOrder);
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="bg-white shadow-sm mb-6 rounded-2xl">
        <div className="flex justify-around bg-white py-4 rounded-2xl">
          {tabs.map(tab => (
            <a
              key={tab}
              className={`text-[20px] font-semibold ${activeTab === tab ? '!text-blue !bg-white' : 'text-darkgrey'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-6 pb-8">
        {listOrder?.map(order => {
          console.log('Rendering order:', order);
          const orderItems = orderItemsMap.get(order.id) ?? [];
          const variantMapFiltered = new Map<string, IProductVariant>();
          orderItems.forEach(item => {
            const variant = variantMap.get(item.variantId);
            if (variant) {
              variantMapFiltered.set(item.variantId, variant);
            }
          });
          const payment = paymentsMap.get(order.id);
          return (
            <OrderCard key={order.id} order={order} orderItems={orderItems} variantMap={variantMapFiltered} payment={payment} />
          );
        })}

        {listOrder?.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <p>You have no orders in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}