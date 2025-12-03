'use client';
import { getImages } from '@/apis/image';
import { getProductById } from '@/apis/product';
import { getVariantById, getVariants } from '@/apis/variant';
import { getWishlists } from '@/apis/wishlist';
import { SplashScreen } from '@/components/loading';
import ProductList, { ProductListLaster } from '@/components/product/productList';
import { useUserProfile } from '@/context/user-context';
import { IConditionalImage, IImage } from '@/interfaces/image';
import { IProduct, IProductDetails } from '@/interfaces/product';
import { IWishlist, IWishlistCond } from '@/interfaces/wishlist';
import { fetcher } from '@/utils/axios';
import { get } from 'http';
import React, { useState, useRef, useMemo, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { set } from 'zod';
type SearchProps = {
    id: string;
}

const ITEMS_PER_PAGE = 12;

const getPaginationRange = (currentPage: number, totalPages: number) => {
    const range = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
        return range;
    }

    range.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
        range.push('...');
    } else if (startPage === 2 && totalPages > 3) {
        range.push(2);
    }

    for (let i = startPage; i <= endPage; i++) {
        if(!range.includes(i)) {
            range.push(i);
        }
    }

    if (endPage < totalPages - 1) {
        range.push('...');
    } else if (endPage === totalPages - 1 && totalPages > 3) {
        range.push(totalPages - 1);
    }

    if(!range.includes(totalPages)) {
        range.push(totalPages);
    }

    let finalRange = [];
    for (let i = 0; i < range.length; i++) {
        if (range[i] === '...' && i > 0 && i < range.length - 1 && typeof range[i - 1] === 'number' && typeof range[i + 1] === 'number' && (range[i - 1] as number) + 1 === (range[i + 1] as number)) {
            continue;
        }
        finalRange.push(range[i]);
    }
    return finalRange;
}

export default function WishlistView() {
    const { userProfile} = useUserProfile()
    const [wishlist, setWishlist] = React.useState<IWishlist[]>();
    const [products, setProducts] = React.useState<IProductDetails[]>([]);
    const [variantMap, setVariantMap] = React.useState<Record<string, any>>({});
    const [images, setImages] = React.useState<Record<string, IImage[]>>({});
    const [currentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    
    const fetchWishlist = async () => {
        try {
            const dto: IWishlistCond = {
                userId: userProfile?.id || ''
            }
            const response = await getWishlists(dto)
            setWishlist(response.data);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } 
    }

    const fetchVariantsForProducts = async (productIds: string[]) => {
        try {
            const variantResponses = await Promise.all(
                productIds.map(productId =>
                    getVariants(productId)
                )
            );
            const variantData: Record<string, any> = {};
            variantResponses.forEach((response, index) => {
                variantData[productIds[index]] = response.data;
            });
            setVariantMap(variantData);
        } catch (error) {
            console.error('Failed to fetch variants:', error);
        }
    }

    const fetchProducts = async (productIds: string) => {
        try {
            const response = await getProductById(productIds);
            setProducts(prevProducts => {
                const prev = prevProducts || [];
                const data = response.data;
                if (Array.isArray(data)) {
                    return data as IProductDetails[];
                }
                return [...prev, data as IProductDetails];
            });
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } 
    }

    const fetchImage = async (productId: string) => {
        try {
            const dto: IConditionalImage = {
                refId: productId,
                type: 'product',
                isMain: true,
            }
            const response = await getImages(dto);
            setImages(prevImages => ({ ...prevImages, [productId]: response.data }));
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } 
    }

    React.useEffect(() => {
        setLoading(true);
        fetchWishlist();
    }, [userProfile]);

    React.useEffect(() => {
        if (wishlist) {
            wishlist.forEach(wishlistItem => {
                fetchProducts(wishlistItem.productId);
            });
        }
    }, [wishlist]);

    React.useEffect(() => {
        products.forEach(product => {
            fetchImage(product.id);
        });
        const productIds = products.map(product => product.id);
        fetchVariantsForProducts(productIds);
        setLoading(false);
    }, [products]);

    const filteredResults = useMemo(() => {
        return products;
    }, [products]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    }, [filteredResults.length]);

    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredResults.slice(startIndex, endIndex);
    }, [filteredResults, currentPage]);

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const pageNumbers = getPaginationRange(currentPage, totalPages);

    if (loading) {
       return <SplashScreen className="h-[80vh]"/>;
    }
    return (
        <div className='flex flex-col w-full'>
            <h1 className="text-2xl font-bold mb-4">MY WISHLIST</h1>
            <div className=''>
                <ProductList products={currentProducts} variants={variantMap} length={3} />
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12">
                        <button 
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100 transition flex items-center gap-1 font-semibold uppercase px-4"
                        >
                            <GrFormPrevious size={18} /> PREVIOUS
                        </button>
                        
                        {pageNumbers.map((item, index) => (
                            <React.Fragment key={index}>
                                {item === '...' ? (
                                    <span className="px-3 py-2 text-gray-700">...</span>
                                ) : (
                                    <button
                                        onClick={() => goToPage(item)}
                                        className={`px-4 py-2 rounded-xl font-semibold transition border ${
                                            currentPage === item 
                                                ? 'bg-black text-white border-black bg-neutral-950' // Trang hiện tại: nền đen
                                                : 'text-black border-gray-300 hover:bg-gray-100' // Trang khác: nền trắng, border nhẹ
                                        }`}
                                    >
                                        {item}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                        {/* Nút NEXT */}
                        <button 
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100 transition flex items-center gap-1 font-semibold uppercase px-4"
                        >
                            NEXT <GrFormNext size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}