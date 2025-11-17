import React from "react";
import Image from "next/image";
import { Package } from 'lucide-react';

type PaymentMethodId = 'vnpay' | 'momo' | 'zalopay' | 'cod';

type PaymentViewProps = {
    selectedMethod: PaymentMethodId;
    selectedMethodChild: string;
    setSelectedMethodChild: (method: string) => void;
}
export default function PaymentDynamicContent({ selectedMethod, selectedMethodChild, setSelectedMethodChild }: PaymentViewProps) {
    console.log("select child:", selectedMethodChild);
    console.log("select method:", selectedMethod);

    switch (selectedMethod) {
        case 'vnpay':
            return (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">VNPay Payment</h2>
                    <div
                        key="VNPAYQR"
                        onClick={() => setSelectedMethodChild('VNPAYQR')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'VNPAYQR'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                App Ngân hàng và Ví điện tử
                                (
                                <span className='inline-flex items-end font-bold'>
                                    <span className="text-[#e50019]">VN</span>
                                    <span className="text-[#004a9c]">PAY</span>
                                    <sup className="text-[#e50019] top-[-1rem] text-[60%]">QR</sup>
                                </span>
                                )
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/VNPAYQR.png" alt="VNPay QR" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="VNBANK"
                        onClick={() => setSelectedMethodChild('VNBANK')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'VNBANK'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Thẻ nội địa và tài khoản ngân hàng
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/VNPAYBANK.png" alt="VNPAYBANK" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="INTCARD"
                        onClick={() => setSelectedMethodChild('INTCARD')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'INTCARD'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Thẻ thanh toán quốc tế
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/VNPAYVISA.png" alt="INTCARD" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="VNMART"
                        onClick={() => setSelectedMethodChild('VNMART')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'VNMART'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full flex gap-1 font-bold m-0 text-[15px]">
                                <p>App </p>
                                <span className='inline-flex items-end font-bold'>
                                    <span className="text-[#e50019]">VN</span>
                                    <span className="text-[#004a9c]">PAY</span>
                                    <sup className="text-[#e50019] top-[-1rem] text-[60%]">QR</sup>
                                </span>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/VNPAYMART.png" alt="INTCARD" width={58} height={58} />
                        </div>
                    </div>                    
                </div>
            );
        case 'momo':
            return (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Momo Payment</h2>
                    <div
                        key="captureWallet"
                        onClick={() => setSelectedMethodChild('captureWallet')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'captureWallet'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Ví Momo
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/momo.png" alt="Momo" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="payWithVTS"
                        onClick={() => setSelectedMethodChild('payWithVTS')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'payWithVTS'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Ví trả sau
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/vtsmomo.png" alt="payWithVTS" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="payWithATM"
                        onClick={() => setSelectedMethodChild('payWithATM')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'payWithATM'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Thẻ ATM nội địa
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/momoatm.png" alt="payWithATM" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="payWithCC"
                        onClick={() => setSelectedMethodChild('payWithCC')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'payWithCC'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full flex gap-1 font-bold m-0 text-[15px]">
                                Thẻ Visa/Mastercard/JCB
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/momocc.png" alt="payWithCC" width={58} height={58} />
                        </div>
                    </div>                    
                </div>
            );
        case 'zalopay':
return (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">ZaloPay Payment</h2>
                    <div
                        key="qr"
                        onClick={() => setSelectedMethodChild('qr')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'qr'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Mở ứng dụng Zalopay
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/zalopayqr.png" alt="ZaloPay" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="cc"
                        onClick={() => setSelectedMethodChild('cc')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'cc'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                                Thẻ quốc tế
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/zalopaycc.png" alt="cc" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="vietqr"
                        onClick={() => setSelectedMethodChild('vietqr')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'vietqr'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full font-bold m-0 text-[15px]">
                               Quyét QR & hanh toán bằng ứng dụng ngân hàng
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/zalopayvietqr.png" alt="vietqr" width={58} height={58} />
                        </div>
                    </div>
                    <div
                        key="atm-one-form"
                        onClick={() => setSelectedMethodChild('atm-one-form')}
                        className={`
                        flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-all
                        ${selectedMethodChild === 'atm-one-form'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent border border-gray-400' 
                        }
                    `}
                    >
                        <div>
                            <div className="w-full flex gap-1 font-bold m-0 text-[15px]">
                                Thẻ /Tài khoản nội địa
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Image src="/zalopayatm.png" alt="atm-one-form" width={58} height={58} />
                        </div>
                    </div>                    
                </div>
            );
        case 'cod':
            return (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Package className="h-7 w-7 text-blue-600 flex-shrink-0" />
                        <h2 className="text-xl font-bold text-gray-800">Thanh toán khi nhận hàng (COD)</h2>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm">
                        <p className="text-gray-800 text-[15px] font-medium leading-relaxed">
                            Bạn sẽ thanh toán bằng tiền mặt cho <span className="font-bold text-blue">nhân viên giao hàng</span> hoặc <span className="font-bold text-blue">nhân viên tại cửa hàng</span> khi nhận được sản phẩm.
                        </p>
                        <p className="text-gray-600 text-sm mt-3">
                            Vui lòng chuẩn bị đúng số tiền thanh toán để quá trình giao hàng diễn ra thuận lợi.
                        </p>
                    </div>
                </div>
            )
    }
};