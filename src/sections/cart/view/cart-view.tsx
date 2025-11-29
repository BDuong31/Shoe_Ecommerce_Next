"use client"
import CartItem from '@/components/cart/cartItem';
import React, { useEffect, useState, useMemo, use } from 'react'
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
    const {userProfile} = useUserProfile();
    const { showToast } = useToast();
    const [relatedProducts, setRelatedProducts] = useState<IProductDetails[]>([])
    const [relatedVariants, setRelatedVariants] = useState<Record<string, IProductVariant[]>>({})
    const [variants, setVariants] = useState<IProductVariant[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const [variantMap, setVariantMap] = useState<Record<string, IProductVariant>>({})
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [code, setCode] = useState<string>('');
    const [coupon, setCoupon] = useState<ICoupon[] | null>(null);
    const [userCoupons, setUserCoupons] = useState<IUserCoupon[]>([]);
    const [couponList, setCouponList] = useState<ICoupon[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

    const [loading, setLoading] = useState(true);

    const fetchVariants = async (variantId: string) => {
        setLoading(true);
        try {
            const response = await getVariantById(variantId);
            return response.data;
        } catch (error) {
            console.error('Error fetching variant by ID:', error);
            return null;
        } finally {
            setLoading(false)
        }
    }

    const fetchVariantByProductId = async (productId: string) => {
        setLoading(true);
        try {
            const response = await getVariants(productId);
            return response.data;
        } catch (error) {
            console.error('Error fetching variants by product ID:', error);
            return [];
        } finally {
            setLoading(false)
        }
    }

    const fetchRelatedProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            const allProducts = response.data;
            setRelatedProducts(allProducts);
        } catch (error) {
            console.error('Error fetching related products:', error);
        } finally {
            setLoading(false);
        }
    }
    
    const fetchCoupon = async (code: string) => {
        setLoading(true);
        try {
            const response = await getCouponByCondition({ code });
            console.log('Fetched coupon:', response);
            setCoupon(response.data);
        } catch (error) {
            console.error('Error fetching coupon by code:', error);
            setCoupon(null);
        } finally {
            setLoading(false);
        }
    }

    const fetcheCouponById = async (id: string) => {
        setLoading(true);
        try {
            const response = await getCouponById(id);
            return response.data;
        } catch (error) {
            console.error('Error fetching coupon by ID:', error);
            return null;
        } finally {
            setLoading(false);
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

    const fetchUserCoupons = async () => {
        setLoading(true);
        try {
            const response = await getUserCoupons();
            setUserCoupons(response.data);
        } catch (error) {
            console.error('Error fetching user coupons:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    const handleApplyVoucher = async () => {
        setLoading(true);
        if (!code || code.trim() === '') {
            showToast('Please enter a voucher code.', 'error');
            setLoading(false);
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
            console.error('Error fetching coupon:', error);
            showToast('Failed to apply voucher.', 'error');
            setCoupon(null);
            clearVoucher();
        } finally {
            setLoading(false);
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

    useEffect(() => {
        fetchRelatedProducts();
    }, []);

    useEffect(() => {
        const loadRelatedVariants = async () => {
            if (relatedProducts.length === 0) return;

            const newMap: Record<string, IProductVariant[]> = {};
            await Promise.all(
                relatedProducts.map(async (product) => {
                    try {
                        const variants = await fetchVariantByProductId(product.id);
                        if (variants) {
                            newMap[product.id] = variants;
                        }
                    } catch (error) {
                        console.error('Error fetching variants for product:', product.id, error);
                    }
                })
            );

            setRelatedVariants((prevVariants) => ({
                ...prevVariants,
                ...newMap,
            }));
        };

        loadRelatedVariants();
    }, [relatedProducts]);

    console.log('Related variants:', relatedVariants);

    useEffect(() => {
        const fetchAllVariants = async () => {
            if (cartItem && cartItem.length > 0) {
                cartItem.forEach(async (item) => {
                    const variantData = await fetchVariants(item.variantId);
                    if (variantData) {
                        setVariantMap((prevMap) => ({
                            ...prevMap,
                            [item.variantId]: variantData,
                        }));
                    }
                });
            }
        };

        fetchAllVariants();
        fetchUserCoupons();
    }, [cartItem]);

    useEffect(() => {
        const loadCoupons = async () => {
            const loadedCoupons: ICoupon[] = [];
            for (const userCoupon of userCoupons) {
                const coupon = await fetcheCouponById(userCoupon.couponId);
                if (coupon) {
                    loadedCoupons.push(coupon);
                }
            }
            setCouponList(loadedCoupons);
        };
        loadCoupons();
    }, [userCoupons])

    useEffect(() => {
        if (cartItem && Object.keys(variantMap).length > 0) {
            const products = cartItem
                .map((item) => {
                const variant = variantMap[item.variantId];
                return variant?.product ?? null; 
                })
                .filter((p): p is IProduct => p !== null);

            setProducts(products);

            if (products.length === 0) return;

        }
    }, [cartItem, variantMap]);

    useEffect(() => {
        if (products.length > 0) {
            products.forEach((product) => {
                const response = fetchVariantByProductId(product.id);
                if (response) {
                    response.then((variants) => {
                        setVariants((prevVariant) => {
                            const newVariant = [...prevVariant];
                            variants.forEach((variant) => {
                                if (!newVariant.find(v => v.id === variant.id)) {
                                    newVariant.push(variant);
                                }
                            });
                            return newVariant;
                        });
                    });
                }
            });
        }

    }, [products]);

    useEffect(() => {
        if (!cartItem || !variantMap || !products || products.length === 0) {
            setCartTotal(0); 
            return;
        }

        const cartTotal = cartItem.reduce((total, item) => {
            const productVariant = variantMap[item.variantId];

            if (productVariant) {
                const product = products.find(p => p.id === productVariant.productId);
                
                if (product) {
                    const price = product.price;
                    total += price * item.quantity;
                } else {
                    console.warn(`[Item: ${item.id}] Product NOT FOUND for productId: ${productVariant.productId}`);
                }
            } else {
                console.warn(`[Item: ${item.id}] Variant NOT FOUND for variantId: ${item.variantId}`);
            }
            return total;
        }, 0);

        setCartTotal(cartTotal);        
    }, [cartItem, variantMap, products]);


    useEffect(() => {
        if (voucherCode) {
            setCode(voucherCode);
        } else {
            setCode('');
        }
    }, [voucherCode]);

    useEffect(() => {
        if (voucherCode) {
            fetchCoupon(voucherCode);
        } else {
            setCoupon(null);
        }
    }, [voucherCode]);

    useEffect(() => {
        if (coupon && coupon.length > 0 && checkCouponValidity(coupon[0])) {
            console.log('Calculating discount based on:', coupon);
            let discount = 0;
            if (coupon[0].type === 'percentage') {
                discount = (cartTotal * coupon[0].discountValue) / 100;
            } else if (coupon[0].type === 'fixed') {
                discount = coupon[0].discountValue;
            }
            setVoucherDiscount(discount);
            setTotalAfterDiscount(cartTotal - discount);
        } else {
            setVoucherDiscount(0);
            setTotalAfterDiscount(cartTotal);
        }
    }, [coupon, cartTotal]);


    useEffect(() => {
        const calculateItemsPerPage = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth >= 1280) {
                    setItemsPerPage(4);
                } else if (window.innerWidth >= 1024) {
                    setItemsPerPage(2);
                } else {
                    setItemsPerPage(1);
                }
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
        if (currentPage > totalPages) {
            setCurrentPage(totalPages > 0 ? totalPages : 1);
        }
    }, [relatedProducts.length, itemsPerPage, currentPage, totalPages]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return relatedProducts.slice(startIndex, endIndex);
    }, [relatedProducts, currentPage, itemsPerPage]);

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
                            <p>{cart?.totalItem} items</p> 
                            <p>${cartTotal}</p>
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
                <ProductListLaster products={paginatedProducts} variants={relatedVariants} length={4} /> 
                <div className='flex gap-2 py-4 justify-center'>
                    {
                        Array.from({ length: totalPages }).map((_, i) => {
                            return <span key={i} className={`w-10 h-1 rounded-3xl ${currentPage === i + 1 ? 'bg-blue' : 'bg-darkgrey opacity-25'}`}></span>
                        })
                    }
                </div>
            </div>
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

                    {/* User's voucher list */}
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
                        console.log('User coupon:', c);
                        console.log('Coupon list:', couponItem);
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