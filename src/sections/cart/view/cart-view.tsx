"use client"
import CartItem from '@/components/cart/cartItem';
import React, { useEffect, useState, useMemo } from 'react'
import { ProductListLaster } from '@/components/product/productList';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useRouter } from 'next/dist/client/components/navigation';
import { useCart } from '@/context/cart-context';
import { IProductVariant } from '@/interfaces/variant';
import { IProduct, IProductDetails } from '@/interfaces/product';
import { getVariantById, getVariants } from '@/apis/variant';
import { getProducts } from '@/apis/product';
import { ICartItem } from '@/interfaces/cart';
import { ICoupon } from '@/interfaces/coupon';
import { getCouponByCondition, getCouponById } from '@/apis/coupon';
import { useToast } from '@/context/toast-context';
import { getUserCoupons } from '@/apis/user';
import { useUserProfile } from '@/context/user-context';
import { IUserCoupon } from '@/interfaces/user';
import { SplashScreen } from '@/components/loading';

export default function CartView() {
    const rounter = useRouter();
    const { cart, cartItem, voucherCode, applyVoucher, clearVoucher } = useCart();
    const { showToast } = useToast();
    
    // Data States
    const [relatedProducts, setRelatedProducts] = useState<IProductDetails[]>([])
    const [relatedVariants, setRelatedVariants] = useState<Record<string, IProductVariant[]>>({})
    const [variants, setVariants] = useState<IProductVariant[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const [variantMap, setVariantMap] = useState<Record<string, IProductVariant>>({})
    
    // Voucher & Calculation States
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [code, setCode] = useState<string>('');
    const [coupon, setCoupon] = useState<ICoupon[] | null>(null);
    const [userCoupons, setUserCoupons] = useState<IUserCoupon[]>([]);
    const [couponList, setCouponList] = useState<ICoupon[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

    // Pagination States
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // Loading State - Chỉ dùng 1 state duy nhất quản lý màn hình chờ
    const [loading, setLoading] = useState(true);

    // --- HELPER FUNCTIONS ---
    
    const checkCouponValidity = (coupon: ICoupon) => {
        const currentDate = new Date();
        if (coupon.expiryDate && new Date(coupon.expiryDate) < currentDate) {
            return false;
        }
        return true;
    }

    // --- MAIN DATA LOADING EFFECT (RUNS ONCE) ---
    useEffect(() => {
        const initPageData = async () => {
            setLoading(true);
            try {
                // 1. Fetch dữ liệu độc lập song song (Related Products & User Coupons)
                const [relatedRes, userCouponsRes] = await Promise.all([
                    getProducts(),
                    getUserCoupons()
                ]);

                // Xử lý Related Products
                const allRelatedProducts = relatedRes.data || [];
                setRelatedProducts(allRelatedProducts);

                // Xử lý User Coupons
                const uCoupons = userCouponsRes.data || [];
                setUserCoupons(uCoupons);

                // 2. Fetch dữ liệu phụ thuộc (Variant của Related Products, Chi tiết Coupon, Variant của Cart)
                
                // A. Fetch variants cho related products
                const relatedVariantPromises = allRelatedProducts.map(p => 
                    getVariants(p.id).then(res => ({ id: p.id, variants: res.data })).catch(() => null)
                );

                // B. Fetch chi tiết coupons
                const couponDetailPromises = uCoupons.map(uc => 
                    getCouponById(uc.couponId).then(res => res.data).catch(() => null)
                );

                // C. Fetch variants cho items đang có trong giỏ hàng (Để hiển thị ngay lập tức)
                const cartVariantPromises = cartItem ? cartItem.map(item => 
                    getVariantById(item.variantId).then(res => res.data).catch(() => null)
                ) : [];

                // Chạy tất cả promise phụ thuộc
                const [relatedVarsResults, couponDetailsResults, cartVarsResults] = await Promise.all([
                    Promise.all(relatedVariantPromises),
                    Promise.all(couponDetailPromises),
                    Promise.all(cartVariantPromises)
                ]);

                // Update State Related Variants
                const newRelatedMap: Record<string, IProductVariant[]> = {};
                relatedVarsResults.forEach(item => {
                    if (item) newRelatedMap[item.id] = item.variants;
                });
                setRelatedVariants(newRelatedMap);

                // Update State Coupon List
                const validCoupons = couponDetailsResults.filter((c): c is ICoupon => c !== null);
                setCouponList(validCoupons);

                // Update State Variant Map (Cho Cart)
                const newVariantMap: Record<string, IProductVariant> = {};
                cartVarsResults.forEach(v => {
                    if (v) newVariantMap[v.id] = v;
                });
                setVariantMap(prev => ({ ...prev, ...newVariantMap }));

            } catch (error) {
                console.error("Error initializing cart data:", error);
                showToast("Failed to load some data", "error");
            } finally {
                // Tắt loading sau khi mọi thứ đã xong
                setLoading(false);
            }
        };

        initPageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Chỉ chạy 1 lần khi mount


    // --- SECONDARY EFFECTS (Logic tính toán & Update nhẹ) ---

    // Effect riêng để handle việc user thêm item vào giỏ khi đang ở trang Cart (nếu có)
    // Nó sẽ fetch thầm lặng mà không bật lại SplashScreen
    useEffect(() => {
        if (!loading && cartItem && cartItem.length > 0) {
            const missingVariants = cartItem.filter(item => !variantMap[item.variantId]);
            if (missingVariants.length > 0) {
                missingVariants.forEach(async (item) => {
                    try {
                        const res = await getVariantById(item.variantId);
                        if (res.data) {
                            setVariantMap(prev => ({...prev, [item.variantId]: res.data}));
                        }
                    } catch (e) { console.error(e) }
                });
            }
        }
    }, [cartItem, loading, variantMap]);

    // Tính toán Products list từ cart items (đồng bộ)
    useEffect(() => {
        if (cartItem && Object.keys(variantMap).length > 0) {
            const derivedProducts = cartItem
                .map((item) => variantMap[item.variantId]?.product ?? null)
                .filter((p): p is IProduct => p !== null);
            
            // Loại bỏ trùng lặp nếu cần
            const uniqueProducts = Array.from(new Map(derivedProducts.map(p => [p.id, p])).values());
            setProducts(uniqueProducts);
        }
    }, [cartItem, variantMap]);

    // Fetch variants của chính các sản phẩm trong giỏ hàng (để hiển thị option đổi size/màu nếu cần)
    useEffect(() => {
        if (products.length > 0) {
            products.forEach((product) => {
                getVariants(product.id).then((res) => {
                    setVariants((prev) => {
                        const newV = [...prev];
                        res.data.forEach((v: IProductVariant) => { // Type explicitly
                             if (!newV.find(existing => existing.id === v.id)) newV.push(v);
                        });
                        return newV;
                    });
                }).catch(console.error);
            });
        }
    }, [products]);

    // Tính tổng tiền
    useEffect(() => {
        if (!cartItem || !variantMap) {
            setCartTotal(0); 
            return;
        }

        const total = cartItem.reduce((acc, item) => {
            const variant = variantMap[item.variantId];
            if (variant && variant.product) {
                return acc + (variant.product.price * item.quantity);
            }
            return acc;
        }, 0);

        setCartTotal(total);        
    }, [cartItem, variantMap]);

    // Xử lý Voucher code từ Context
    useEffect(() => {
        if (voucherCode) {
            setCode(voucherCode);
            // Fetch coupon info if needed specifically for the input code
            getCouponByCondition({ code: voucherCode }).then(res => {
                setCoupon(res.data);
            }).catch(() => setCoupon(null));
        } else {
            setCode('');
            setCoupon(null);
        }
    }, [voucherCode]);

    // Tính toán giảm giá (Discount)
    useEffect(() => {
        if (coupon && coupon.length > 0 && checkCouponValidity(coupon[0])) {
            let discount = 0;
            if (coupon[0].type === 'percentage') {
                discount = (cartTotal * coupon[0].discountValue) / 100;
                // Kiểm tra max discount nếu có (logic thêm)
                if (coupon[0].maxDiscount && discount > coupon[0].maxDiscount) {
                    discount = coupon[0].maxDiscount;
                }
            } else if (coupon[0].type === 'fixed') {
                discount = coupon[0].discountValue;
            }
            setVoucherDiscount(discount);
            setTotalAfterDiscount(Math.max(0, cartTotal - discount));
        } else {
            setVoucherDiscount(0);
            setTotalAfterDiscount(cartTotal);
        }
    }, [coupon, cartTotal]);

    // Logic phân trang (Resize)
    useEffect(() => {
        const calculateItemsPerPage = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth >= 1280) setItemsPerPage(4);
                else if (window.innerWidth >= 1024) setItemsPerPage(2);
                else setItemsPerPage(1);
            }
        };
        calculateItemsPerPage();
        window.addEventListener('resize', calculateItemsPerPage);
        return () => window.removeEventListener('resize', calculateItemsPerPage);
    }, []);

    useEffect(() => {
        if (relatedProducts.length > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(relatedProducts.length / itemsPerPage));
        } else {
            setTotalPages(0);
        }
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [relatedProducts.length, itemsPerPage, currentPage, totalPages]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return relatedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [relatedProducts, currentPage, itemsPerPage]);

    // Handlers
    const handleApplyVoucher = async () => {
        // Local loading UI could be added here instead of full screen splash
        if (!code || code.trim() === '') {
            showToast('Please enter a voucher code.', 'error');
            return;
        } 
        try {
            const response = await getCouponByCondition({ code: code.trim() });
            const fetchedCoupons = response.data;
            if (fetchedCoupons && fetchedCoupons.length > 0 && checkCouponValidity(fetchedCoupons[0])) {
                applyVoucher(code.trim());
                setCoupon(fetchedCoupons);
                showToast('Voucher applied successfully!', 'success');
            } else {
                showToast('Invalid or expired voucher code.', 'error');
                setCoupon(null);
                clearVoucher();
            } 
        } catch (error) {
            console.error(error);
            showToast('Failed to apply voucher.', 'error');
        }
    }

    const handleSelectVoucher = (selectedCode: string) => {
        setCode(selectedCode);
        applyVoucher(selectedCode);
        const selectedCoupon = couponList.find(c => c.code === selectedCode);
        if (selectedCoupon) {
            setCoupon([selectedCoupon]);
            (document.getElementById('voucher_modal') as HTMLDialogElement).close();
            showToast('Voucher applied successfully!', 'success');
        } else {
            showToast('Failed to apply voucher.', 'error');
        }
    }
    
    const handleClearVoucher = () => {
        clearVoucher();
        setCode('');
        setCoupon(null);
        setVoucherDiscount(0);
    }

    if (loading) {
        return <SplashScreen className='h-[80px]' />
    }

    return (
        <>
            <div className='m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] lg:grid grid-cols-3 gap-5 py-10'>
                <div className='max-h-screen col-span-2 bg-fawhite p-4 lg:p-7 rounded-xl mb-10 lg:mb-0 flex flex-col'>                    
                    <div>
                        <h1 className='text-2xl font-semibold'>Your Bag</h1>
                        <p className='text-sm text-darkgrey opacity-80 mt-1 mb-6'>Items in your bag not reserved- check out now to make them yours.</p>
                    </div>
                    <div className='flex-1 flex flex-col gap-6 min-h-0 overflow-y-auto scrollbar-hide'>
                        {cartItem && cartItem.length > 0 ? 
                            (
                                cartItem.map((item : ICartItem, idx : number) => {
                                    return <CartItem key={idx} item={item} variant={variantMap[item.variantId]} variantList={variants} type='cart' />;
                                })
                            ) : (
                                <p className='text-center text-darkgrey font-semibold'>Your cart is empty.</p>
                            )
                        }
                    </div>
                </div>
                <div className='bg-fawhite lg:p-0  px-7 p-4 lg:pb-7 rounded-xl lg:bg-transparent'>
                    <h1 className='text-2xl font-semibold py-5'>Order Summary</h1>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row justify-between'>
                            <p>{cart?.totalItem || 0} items</p> 
                            <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                            <p>Delivery</p>
                            <p>$0</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                            <p>Discount</p>
                            <p className='text-green-600'>
                                {voucherDiscount > 0 ? `-$${voucherDiscount.toFixed(2)}` : '$0'}
                            </p>
                        </div>
                    <div className='flex flex-row justify-between'>
                            <p>Total</p>
                            <p>${totalAfterDiscount.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className='flex w-full mt-5'>
                        {!voucherCode && (
                            <button 
                                className="bg-darkgrey text-fawhite rounded-lg px-4 h-10 w-full"
                                onClick={() => (document.getElementById('voucher_modal') as HTMLDialogElement).showModal()}
                            >
                                Apply Voucher
                            </button>
                        )}
                        
                        {voucherCode && (
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-green-600 font-semibold'>
                                    Applied: "{voucherCode}"
                                </p>
                                <button 
                                    onClick={handleClearVoucher} 
                                    className='text-[#FF0000] hover:underline'
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                    <button className='w-full bg-darkgrey text-fawhite rounded-lg py-2 mt-5 uppercase' onClick={() => rounter.push("/checkout")}>Checkout</button>
                </div>
            </div>
            
            {/* Related Products Section */}
            <div className='m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]'>
                <div>
                    <div className={`pb-5 flex m-auto`}>
                        <h1 className='2xl:text-[40px] xl:text-[30px] lg:text-[30px] md:text-[30px] sm:text-[30px] text-[24px] font-semibold flex-1 text-darkgrey'>You may also like</h1>
                        <div className='flex-1 self-end'>
                            <div className='flex justify-end gap-5'>
                                <button className='p-2 bg-darkgrey rounded-lg disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                    <GrFormPrevious color='white' size={20}/>
                                </button>
                                <button className='p-2 bg-darkgrey rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                    <GrFormNext color='white' size={20}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductListLaster products={paginatedProducts} variants={relatedVariants} length={itemsPerPage} /> 
                <div className='flex gap-2 py-4 justify-center'>
                    {
                        Array.from({ length: totalPages }).map((_, i) => {
                            return <span key={i} className={`w-10 h-1 rounded-3xl ${currentPage === i + 1 ? 'bg-blue' : 'bg-darkgrey opacity-25'}`}></span>
                        })
                    }
                </div>
            </div>

            {/* Voucher Modal */}
            <dialog id="voucher_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter voucher code"
                        className="input input-bordered flex-1"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="btn btn-neutral" onClick={handleApplyVoucher}>
                        Apply
                    </button>
                    </div>

                    <div className="divider">Or</div>
                    <h3 className="font-bold text-lg mb-4">Select Your Voucher</h3>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                    {userCoupons && userCoupons.length > 0 ? (
                        userCoupons.map((c: IUserCoupon, idx: number) => {
                        const couponItem = couponList.find(coupon => coupon.id === c.couponId);
                        const couponExpiry = couponItem?.expiryDate ? (new Date(couponItem.expiryDate) < new Date()) : false;
                        const isStatus = couponExpiry ? 'expired' : c.status;
                        const UserUse = (couponItem?.totalUsageLimit ?? 0) - (couponItem?.currentUsageCount ?? 0);

                        const isSelected = isStatus === 'available' ? true : false;
                        const isMinSpend = couponItem && couponItem.minSpend ? (cartTotal >= couponItem.minSpend) : true;   
                        const maxDiscount = couponItem && couponItem.maxDiscount ? couponItem.maxDiscount : null;
                        
                        return (
                        <div 
                            key={idx}
                            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-100 ${!isSelected || !isMinSpend || UserUse <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => isSelected && isMinSpend && UserUse > 0 && handleSelectVoucher(couponItem?.code || "")}
                        >
                            <p className="font-semibold">{couponItem?.name}</p>
                            <p className="text-sm opacity-70">{couponItem?.description}</p>
                            {!isSelected && (
                                <div className="ml-2">
                                {isStatus === 'used' ? (
                                    <span className="badge badge-ghost text-xs whitespace-nowrap">Used</span>
                                ) : isStatus === 'expired' ? (
                                    <span className="badge badge-error text-white text-xs whitespace-nowrap">Expired</span>
                                ) : null}
                                </div>
                            )} 
                            {!isMinSpend && isSelected && (
                                <div className="ml-2">
                                <span className="badge badge-warning text-xs whitespace-nowrap">Not enough minimum spend</span>
                                </div>
                            )}
                            {isMinSpend && isSelected && UserUse <= 0 && (
                                <div className="ml-2">
                                <span className="badge badge-ghost text-xs whitespace-nowrap">No uses left</span>
                                </div>
                            )}
                            {isMinSpend && isSelected && maxDiscount && couponItem?.type === "percentage" && (
                                <div className="ml-2">
                                <span className="badge badge-info text-xs whitespace-nowrap">Max discount: {maxDiscount}</span>
                                </div>
                            )} 
                        </div>
                        );
                    })
                    ) : (
                        <p className="opacity-70">You have no vouchers.</p>
                    )}
                    </div>

                    <div className="modal-action mt-5">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </>
    )
}