'use client';
import ProductList, { ProductListLaster } from '@/components/product/productList';
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
        if(range[i] === '...' && i > 0 && i < range.length - 1 && range[i-1] + 1 === range[i+1]) {
            continue;
        }
        finalRange.push(range[i]);
    }
    return finalRange;
}

export default function SearchView({ id }: SearchProps) {
    const [currentPage, setCurrentPage] = React.useState(1);

    const normalizeSearchQuery = (query: string) => {
        return query.trim().toLowerCase().replace('-', ' ');
    }
    const filteredResults = mockProduct.filter(item => 
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

    return (
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10">
            <h1 className="text-2xl font-bold mb-4">Search: {normalizeSearchQuery(id)}</h1>
            <div>
                <ProductList products={currentProducts} length={4} />
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