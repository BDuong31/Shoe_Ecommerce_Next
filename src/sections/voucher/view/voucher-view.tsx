'use client';
import { useToast } from '@/context/toast-context';
import React, { useState, FormEvent } from 'react';
import VoucherCard from '@/components/voucher/voucher-card';
import { IUserCoupon, IUserCouponCreate } from '@/interfaces/user';
import { ICoupon, ICouponCondition } from '@/interfaces/coupon';
import { createUserCoupon, getUserCoupons } from '@/apis/user';
import { useUserProfile } from '@/context/user-context';
import { getCouponByCondition, getCouponById } from '@/apis/coupon';
import { SplashScreen } from '@/components/loading';
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

export default function VouchersView() {
  const {userProfile} = useUserProfile();
  const [vouchers, setVouchers] = useState<IUserCoupon[]>([]);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [activeTab, setActiveTab] = useState('Available');
  const tabs = ['Available', 'Used', 'Expired'];
  const [newCode, setNewCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await getUserCoupons();
      setVouchers(response.data);
    } catch (error) {
      console.error('Failed to fetch vouchers:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchCoupons = async (couponId: string) => {
    setLoading(true);
    try {
      const response = await getCouponById(couponId);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchCouponsByCondition = async (condition: ICouponCondition) => {
    setLoading(true);
    try {
      const response = await getCouponByCondition(condition);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch coupons by condition:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchCreateUserCoupon = async (couponCode: string) => {
    setLoading(true);
    try {
      const dto: IUserCouponCreate = {
        userId: userProfile?.id || '',
        couponId: couponCode,
      }
      const response = await createUserCoupon(dto);
      return response;
    } catch (error) {
      console.error('Failed to create user coupon:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <SplashScreen className="h-[80vh]" />;
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