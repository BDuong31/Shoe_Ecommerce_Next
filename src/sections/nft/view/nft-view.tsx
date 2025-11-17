// src/app/profile/my-nfts/page.tsx
'use client';
import React, { useState } from 'react';
import { useToast } from '@/context/toast-context'; // Dùng toast để thông báo
import { FaWallet } from 'react-icons/fa';
import Image from 'next/image';

const initialClaimable = [
  { id: 1, name: 'Well Shoes Limited Edition', orderId: 'ADF123' },
  { id: 2, name: 'Well Shoes x Artist Collab', orderId: 'BCE456' },
];
const initialOwned = [
  { id: 1, name: 'Well Shoes #001', imageUrl: '/shoes.jpg' },
];

// Trang chính
export default function MyNftsView() {
  // === State để mô phỏng ===
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress] = useState('0xAbC...dE12f'); // Ví giả
  
  // State để quản lý danh sách (cho phép thêm/xóa)
  const [claimableItems, setClaimableItems] = useState(initialClaimable);
  const [ownedItems, setOwnedItems] = useState(initialOwned);
  
  // State để theo dõi đang mint
  const [mintingId, setMintingId] = useState<number | null>(null);
  
  const { showToast } = useToast();

  // === Hàm mô phỏng ===

  // Hàm mô phỏng Mint
  const handleMint = (itemToMint: typeof initialClaimable[0]) => {
    setMintingId(itemToMint.id);
    showToast('Bắt đầu mô phỏng mint NFT...', 'info');

    // Giả lập thời gian chờ 2 giây (giống như blockchain)
    setTimeout(() => {
      // 1. Xóa khỏi danh sách "Claimable"
      setClaimableItems(prev => prev.filter(p => p.id !== itemToMint.id));

      // 2. Tạo một NFT giả mới
      const newNft = {
        id: Math.random(),
        name: `${itemToMint.name} #${Math.floor(Math.random() * 1000)}`,
        imageUrl: '/shoes.jpg',
      };

      // 3. Thêm vào danh sách "Owned"
      setOwnedItems(prev => [newNft, ...prev]);

      // 4. Thông báo
      showToast('Mint thành công! (Mô phỏng)', 'success');
      setMintingId(null); 

    }, 2000);
  };

  // Component Nút Kết nối (Mô phỏng)
  const ConnectWalletButton = () => {
    if (isConnected) {
      return (
        <div className="text-right">
          <p className="text-xs text-graymain flex items-center justify-end">
            <FaWallet className="mr-1 text-[#4ade80]" /> Đã kết nối:
          </p>
          <p className="font-mono text-sm break-all">{walletAddress}</p>
          <button 
            onClick={() => setIsConnected(false)} 
            className="btn btn-outline btn-xs mt-2"
          >
            Ngắt kết nối
          </button>
        </div>
      );
    }
    return (
      <button 
        className="btn btn-primary"
        onClick={() => setIsConnected(true)} // Chỉ cần set state
      >
        Kết nối Ví (Mô phỏng)
      </button>
    );
  };

  return (
    <div className='flex flex-col w-full'>
      <div className="flex justify-between items-start mb-6 pb-4">
        <div>
          <h1 className="text-2xl font-bold">My NFTs</h1>
          <p className="text-graymain">Quản lý tài sản kỹ thuật số</p>
        </div>
        <ConnectWalletButton />
      </div>

      {!isConnected ? (
        <div className="text-center p-10 bg-gray rounded-lg">
          <p className="font-semibold">Vui lòng kết nối ví để quản lý NFTs.</p>
        </div>
      ) : (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">NFTs có thể nhận</h2>
            <div className="space-y-4">
              {claimableItems.length > 0 ? (
                claimableItems.map(product => (
                  <div key={product.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-sm text-gray-500">Từ Đơn hàng: {product.orderId}</p>
                    </div>
                    <button 
                      className="btn btn-neutral"
                      onClick={() => handleMint(product)}
                      disabled={mintingId === product.id} 
                    >
                      {mintingId === product.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        'Mint Ngay'
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Bạn không có NFT nào chờ nhận.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">NFTs đã sở hữu</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ownedItems.map(nft => (
                <div key={nft.id} className="card bg-base-100 shadow-xl">
                  <figure className="bg-fawhite aspect-square rounded-2xl">
                    <Image src={nft.imageUrl} alt={nft.name} width={200} height={200} />
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-sm">{nft.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}