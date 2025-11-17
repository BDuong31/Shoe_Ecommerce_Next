'use client';
import { useToast } from '@/context/toast-context';
import React, { useState, FormEvent } from 'react';
import VoucherCard from '@/components/voucher/voucher-card';
import { IUserCoupon, IUserCouponCreate } from '@/interfaces/user';
import { ICoupon, ICouponCondition } from '@/interfaces/coupon';
import { createUserCoupon, getUserCoupons } from '@/apis/user';
import { useUserProfile } from '@/context/user-context';
import { getCouponByCondition, getCouponById } from '@/apis/coupon';
type Voucher = {
  id: number;
  code: string;
  title: string;
  details: string;
  expiry: string;
  status: 'available' | 'used' | 'expired';
  type: 'percent' | 'fixed';
  value: number;
};

const mockVouchers: Voucher[] = [
  { 
    id: 1, code: 'NEWUSER10', title: '10% OFF Welcome Voucher', 
    details: 'Min. spend $50. Capped at $10.', 
    expiry: '31-12-2025', status: 'available', type: 'percent', value: 10 
  },
  { 
    id: 2, code: 'FREESHIP', title: '$5 OFF Shipping', 
    details: 'For all orders over $25.', 
    expiry: '30-11-2025', status: 'available', type: 'fixed', value: 5 
  },
  { 
    id: 3, code: 'USED123', title: 'Black Friday Sale', 
    details: '15% OFF everything.', 
    expiry: '28-11-2025', status: 'used', type: 'percent', value: 15 
  },
  { 
    id: 4, code: 'EXPIRED456', title: 'Old Voucher', 
    details: '$2 OFF', 
    expiry: '01-01-2024', status: 'expired', type: 'fixed', value: 2 
  },
];

export default function VouchersView() {
  const {userProfile} = useUserProfile();
  const [vouchers, setVouchers] = useState<IUserCoupon[]>([]);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [activeTab, setActiveTab] = useState('Available');
  const tabs = ['Available', 'Used', 'Expired'];
  const [newCode, setNewCode] = useState('');

  const { showToast } = useToast();

  const fetchVouchers = async () => {
    try {
      const response = await getUserCoupons();
      setVouchers(response.data);
    } catch (error) {
      console.error('Failed to fetch vouchers:', error);
    }
  }

  const fetchCoupons = async (couponId: string) => {
    try {
      const response = await getCouponById(couponId);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  }

  const fetchCouponsByCondition = async (condition: ICouponCondition) => {
    try {
      const response = await getCouponByCondition(condition);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch coupons by condition:', error);
    }
  }

  const fetchCreateUserCoupon = async (couponCode: string) => {
    try {
      const dto: IUserCouponCreate = {
        userId: userProfile?.id || '',
        couponId: couponCode,
      }
      const response = await createUserCoupon(dto);
      return response;
    } catch (error) {
      console.error('Failed to create user coupon:', error);
    }
  }

  React.useEffect(() => {
    fetchVouchers();
  }, []);

  React.useEffect(() => {
    const loadCoupons = async () => {
      const loadedCoupons: ICoupon[] = [];
      for (const voucher of vouchers) {
        const coupon = await fetchCoupons(voucher.couponId);
        if (coupon) {
          loadedCoupons.push(coupon);
        }
      }
      setCoupons(loadedCoupons);
    };
    loadCoupons();
  }, [vouchers]);

  const filteredVouchers = vouchers.filter(v => 
    v.status === activeTab.toLowerCase()
  );

  const handleAddVoucher = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCode.trim()) {
      showToast('Please enter a voucher code', 'error');
      return;
    }
    
    try {
      const data = await fetchCouponsByCondition({ code: newCode.trim() });
      if (!data || data.length === 0) {
        showToast('Invalid voucher code', 'error');
        setNewCode('');
        return;
      }

      const coupon = data[0];

      if (coupons?.some(v => v.code === coupon.code)) {
        showToast('Voucher code already in your wallet', 'warning');
        setNewCode('');
        return;
      }

      const newVoucher: IUserCouponCreate = {
        userId: userProfile?.id || '',
        couponId: coupon.id,
      };

      await createUserCoupon(newVoucher);
      showToast('Voucher added successfully', 'success');

      fetchVouchers();
    } catch (error) {
      showToast('Error validating voucher code', 'error');
      setNewCode('');
      return;
    } finally {
      setNewCode('');
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <h1 className="text-2xl font-bold mb-6 pb-4">My Vouchers</h1>
      
      <form onSubmit={handleAddVoucher} className="mb-6">
        <label className="label">
          <span className="label-text">Add Voucher Code</span>
        </label>
        <div className="join w-full">
          <input
            type="text"
            placeholder="Enter your voucher code"
            className="bg-transparent input input-bordered join-item w-full"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
          <button type="submit" className="btn btn-neutral join-item">
            Add
          </button>
        </div>
      </form>

      <div className="tabs tabs-boxed mb-6">
        {tabs.map(tab => (
          <a
            key={tab}
            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </a>
        ))}
      </div>

      <div className="space-y-4">
        {filteredVouchers.length > 0 ? (
          filteredVouchers.map(v =>{
            const coupon = coupons.find(c => c.id === v.couponId);
            if (!coupon) return null;
            return <VoucherCard key={v.id} userCoupon={v} coupon={coupon} />  
          })
        ) : (
          <p className="text-gray-500 text-center py-10">
            You have no vouchers in this category.
          </p>
        )}
      </div>
    </div>
  );
}