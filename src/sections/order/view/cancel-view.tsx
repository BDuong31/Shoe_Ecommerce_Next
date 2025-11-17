'use client';
import React from 'react';
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
import { refundData } from '@/sections/order/data/cancel';
type OrderDetailPageProps = {
    id: string;
};

const steps = ['Cancellation Requested', 'Cancellation Accepted', 'Refunded'];
export default function CancelView({ id }: OrderDetailPageProps) {
  const { 
    requestId, requestDate, currentStep, status, statusMessage, items, details, reason 
  } = refundData;
  
  return (
    <div className="rounded-lg bg-fawhite w-full p-6">
      <div className="w-full">
        
        <div className="flex justify-between items-center mb-4">
          <Link href="/user/purchase" className="btn btn-ghost">
            <ChevronLeft /> BACK
          </Link>
          <div className="flex text-right text-xs text-gray-500">
            <div>Request ID: <span className="text-blue-600">{requestId}</span></div>
            <div className="mx-4">|</div>
            <div>Requested at: {requestDate}</div>
          </div>
        </div>

        <div className="p-6 rounded-lg mb-6">
          <ul className="steps w-full">
            {steps.map((stepName, index) => (
              <li 
                key={index}
                className={`step ${index + 1 <= currentStep ? 'step-neutral' : ''}`}
                data-content=''
              >
                {stepName}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 mb-6">
          <h1 className="text-xl font-bold mb-2">{status}</h1>
          <p className="text-graymain">{statusMessage}</p>
        </div>

        <div className="p-4 rounded-lg mb-6">
          {items?.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>

        <div className="p-6 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-graymain">Refund Amount:</span>
            <span className="font-semibold text-lg text-blue">{details.refundAmount}</span>
          </div>
          <div className="divider my-1"></div>
          <div className="flex justify-between mb-2">
            <span className="text-graymain">Refund to:</span>
            <span>{details.refundTo}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-graymain">Requested by:</span>
            <span>{details.requestedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-graymain">Order ID:</span>
            <Link href={`/order/${details.orderId}`} className="text-blue-600 underline">
              {details.orderId}
            </Link>
          </div>  
        </div>

        <div className="p-6 rounded-lg">
          <span className="text-gray-500">Reason: </span>
          <span className="font-semibold">{reason}</span>
        </div>

      </div>
    </div>
  )
}