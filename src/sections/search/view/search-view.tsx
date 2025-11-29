'use client';
import { getImages } from '@/apis/image';
import { getProducts } from '@/apis/product';
import { getVariants } from '@/apis/variant';
import { SplashScreen } from '@/components/loading';
import ProductList, { ProductListLaster } from '@/components/product/productList';
import { IConditionalImage, IImage } from '@/interfaces/image';
import { IProduct, IProductDetails } from '@/interfaces/product';
import { IProductVariant } from '@/interfaces/variant';
import mockProduct from '@/sections/home/data/product';
import { get } from 'http';
import React, { useState, useRef, useMemo, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
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
        if (
            range[i] === '...' &&
            i > 0 &&
            i < range.length - 1 &&
            typeof range[i - 1] === 'number' &&
            typeof range[i + 1] === 'number' &&
            (range[i - 1] as number) + 1 === (range[i + 1] as number)
        ) {
            continue;
        }
        finalRange.push(range[i]);
    }
    return finalRange;
}

export default function SearchView({ id }: SearchProps) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState<IProductDetails[]>([]);
    const [variantMap, setVariantMap] = React.useState<Record<string, IProductVariant[]>>({});
    const [image, setImage] = React.useState<Record<string, IImage[]>>({});
    const [productIds, setProductIds] = React.useState<string[]>([]);

    const fetcheProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchVariantsForProducts = async (productIds: string[]) => {
        setLoading(true);
        try {
            const variantMap: Record<string, IProductVariant[]> = {};
            for (const productId of productIds) {
                try {
                    const response = await getVariants(productId); 
                    variantMap[productId] = response.data;
                } catch (error) {
                    console.error(`Error fetching variants for product ${productId}:`, error);
                    variantMap[productId] = [];
                }
            }
            setVariantMap(variantMap);
        } catch (error) {
            console.error('Error fetching variants:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchImagesForProducts = async (productIds: string[]) => {
        setLoading(true);
        try {
            for (const productId of productIds) {
                try {
                    const dto: IConditionalImage = {
                        refId: productId,
                        type: 'product',
                        isMain: true,
                    }
                    const response = await getImages(dto); 
                    setImage(prevImages => ({ ...prevImages, [productId]: response.data }));
                } catch (error) {
                    console.error(`Error fetching images for product ${productId}:`, error);
                }
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetcheProducts();
    }, []);

    React.useEffect(() => {
        const ids = products.map(product => product.id);
        setProductIds(ids);
        fetchVariantsForProducts(ids);
        fetchImagesForProducts(ids);
    }, [products]);

    const normalizeSearchQuery = (query: string) => {
        return query.trim().toLowerCase().replace('-', ' ');
    }
    const filteredResults = products.filter(item => 
        item?.productName.toLowerCase().includes(normalizeSearchQuery(id))
    );

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
        return <SplashScreen className="h-[80vh]" />;
    }
    return (
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10">
            <h1 className="text-2xl font-bold mb-4">Search: {normalizeSearchQuery(id)}</h1>
            <div>
                <ProductList products={currentProducts} variants={variantMap} images={image} length={4} />
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12">
                        {/* Nút PREVIOUS */}
                        <button 
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100 transition flex items-center gap-1 font-semibold uppercase px-4"
                        >
                            <GrFormPrevious size={18} /> PREVIOUS
                        </button>
                        
                        {/* Các Nút Trang và Dấu Ba Chấm */}
                        {pageNumbers.map((item, index) => (
                            <React.Fragment key={index}>
                                {item === '...' ? (
                                    <span className="px-3 py-2 text-gray-700">...</span>
                                ) : (
                                    <button
                                        onClick={() => goToPage(item as number)}
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