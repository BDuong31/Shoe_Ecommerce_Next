'use client';
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from "react";
// Đảm bảo các đường dẫn này là chính xác trong project của bạn
import mockProduct from "../../home/data/product";
import mockCategories from "../../home/data/category"; 
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProductList from "@/components/product/productList"; // Component con
import Filters from "@/components/filter"; // Component con
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IProductDetails } from "@/interfaces/product";
import { getProducts } from "@/apis/product";
import { IImage } from "@/interfaces/image";
import { getImages } from "@/apis/image";
import { IProductVariant } from "@/interfaces/variant";
import { ICategory } from "@/interfaces/category";
import { getVariantColors, getVariants, getVariantSizes } from "@/apis/variant";
import { getCategories } from "@/apis/category";

const ITEMS_PER_PAGE = 9;

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
        if (!range.includes(i)) {
            range.push(i);
        }
    }

    if (endPage < totalPages - 1) {
        range.push('...');
    } else if (endPage === totalPages - 1 && totalPages > 3) {
        range.push(totalPages - 1);
    }
    
    if (!range.includes(totalPages)) {
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
            Number(range[i - 1]) + 1 === Number(range[i + 1])
        ) {
            continue;
        }
        finalRange.push(range[i]);
    }

    return finalRange;
};


export default function NewDropsView() {
    const [colorFilters, setColorFilters] = useState([]);
    const [sizeFilters, setSizeFilters] = useState([]);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [productList, setProductList] = useState<IProductDetails[]>([]);
    const [products, setProducts] = useState<IProductDetails[]>([]);
    const [variantList, setVariantList] = useState<Record<string, IProductVariant[]>>({});
    const [images, setImages] = useState<Record<string, IImage[]>>({});
    const [Colors, setColors] = useState<string[]>([]);
    const [Sizes, setSizes] = useState<number[]>([]);
    const [Categories, setCategories] = useState<ICategory[]>([]);
    const [ProductsCount, setProductsCount] = useState(0);
    const [FilterPopup, setFilterPopup] = useState(false);
    const [FiltersApplied, setFiltersApplied] = useState('NEWEST');
    const [smFilterPopup, setSmFilterPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const popupRef = useRef<HTMLDivElement | null>(null);
    const filterRef = useRef<HTMLDivElement | null>(null);

    const fetcherColors = async () => {
        try {
            const response = await getVariantColors();
            setColors(response.data);    
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    }

    const fetcherSizes = async () => {
        try {
            const response = await getVariantSizes();
            setSizes(response.data);    
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    }

    useEffect(() => {
        fetcherColors();
        fetcherSizes();
    }, []);

    const fetechProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Fetched products:", response.data);
            setProducts(response.data);
            setProductsCount(response.data.length);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    
    const fetcherVariants = async (productId: string) => {
        try {
            const response = await getVariants(productId);
            setVariantList(prevVariants => ({ ...prevVariants, [productId]: response.data }));
        } catch (error) {
            console.error('Error fetching product variants:', error);
        }
    }


    const fetchImages = async (id: string) => {
        try {
            const response = await getImages(id, 'product');
            setImages(prevImages => ({ ...prevImages, [id]: response.data }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    const fetcherCategory = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    }

    useEffect(() => {
        fetcherCategory();
    }, []);

    useEffect(() => {
        fetechProducts();
    }, []);

    useEffect(() => {
        products.forEach(product => {
            fetchImages(product.id);
            fetcherVariants(product.id);
        });
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        console.log("Filtering and sorting products with filters:", { colorFilters, sizeFilters, categoryFilters, FiltersApplied });
        let tempProducts = products.filter(product => {
            const matchesColor = colorFilters.length === 0 || colorFilters.every(color => 
                variantList[product.id]?.some(variant => variant.color === color)
            );
            const matchesSize = sizeFilters.length === 0 || sizeFilters.every(size => 
                variantList[product.id]?.some(variant => variant.size === size)
            );   
            
            const matchesCategory = categoryFilters.length === 0 || categoryFilters.some(categoryId =>
                product.categoryId.includes(categoryId)
            );

            return matchesColor && matchesSize && matchesCategory;
        });

        tempProducts.sort((a, b) => {
            switch (FiltersApplied) {
                case 'PRICE ASC':
                    return a.price - b.price;
                case 'PRICE DESC':
                    return b.price - a.price;
                case 'NEWEST':
                default:
                    return b.id - a.id;
            }
        });

        console.log("Filtered and sorted products:", tempProducts);

        return tempProducts;
    }, [colorFilters, sizeFilters, categoryFilters, FiltersApplied, products]);

    useEffect(() => {
        setProductsCount(filteredAndSortedProducts.length);
        setProductList(filteredAndSortedProducts);
        setCurrentPage(1); 
    }, [filteredAndSortedProducts]);

    const totalPages = useMemo(() => {
        return Math.ceil(productList.length / ITEMS_PER_PAGE);
    }, [productList.length]);

    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return productList.slice(startIndex, endIndex);
    }, [productList, currentPage]);

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

    // Hàm chung cho sắp xếp
    const handleSortChange = (sortType: string) => {
        setFiltersApplied(sortType);
        setFilterPopup(false);
    };

    return (
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10"> 
            <div>
                <Image src="/banner.png" width={1320} height={395} alt="New Drops" className='w-full object-cover rounded-3xl mb-7 lg:mb-0 max-h-[400px]' />
            </div>
            
            {/* Thanh điều khiển lớn (Desktop) */}
            <div className='hidden lg:flex justify-between px-2 py-7'>
                <div className=''>
                    <h2 className='text-2xl font-semibold'>New Drops</h2>
                    <p>{ProductsCount} items</p>
                </div>
                <div className='relative' ref={popupRef}>
                    <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setFilterPopup(!FilterPopup)}>
                        <p className='text-left font-semibold uppercase'>{FiltersApplied}</p>
                        {FilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                    </button>
                    {
                        FilterPopup &&
                        <ul className='py-3 px-4 text-left font-semibold uppercase bg-fawhite pt-6 -mt-4 rounded-b-xl absolute z-20 w-full'>
                            <li><button className='uppercase mb-1 hover:text-blue-600' onClick={() => handleSortChange('NEWEST')}>Newest</button></li>
                            <li><button className='uppercase mb-1 hover:text-blue-600' onClick={() => handleSortChange('PRICE ASC')}>Price Asc</button></li>
                            <li><button className='uppercase mb-1 hover:text-blue-600' onClick={() => handleSortChange('PRICE DESC')}>Price Desc</button></li>
                        </ul>
                    }
                </div>
            </div>

            {/* Thanh điều khiển nhỏ (Mobile/Tablet) */}
            <div className='lg:hidden pb-5'>
                <div className='flex gap-5'>  
                    <div className='relative' ref={filterRef}>
                        <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setSmFilterPopup(!smFilterPopup)}>
                            <p className='text-left font-semibold uppercase'>Filters</p>
                            {smFilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                        </button>
                        {
                            smFilterPopup &&
                            <div className={`absolute z-20 left-0 right-0 bg-fawhite m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-7 px-5 rounded-b-xl`}>
                                <Filters Colors={Colors} colorFilters={colorFilters} setColorFilters={setColorFilters} Sizes={Sizes} sizeFilters={sizeFilters} setSizeFilters={setSizeFilters} Categories={Categories} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters}/>
                            </div>
                        }
                    </div>
                    
                    <div className='relative' ref={popupRef}>
                        <button className='flex justify-between items-center bg-fawhite min-w-[180px] py-3 px-4 rounded-xl' onClick={() => setFilterPopup(!FilterPopup)}>
                            <p className='text-left font-semibold uppercase'>{FiltersApplied}</p>
                            {FilterPopup ? <MdKeyboardArrowUp  size={20}/> : <MdKeyboardArrowDown size={25}/>}
                        </button>
                        {
                            FilterPopup &&
                            <ul className='py-3 px-4 text-left font-semibold uppercase bg-white pt-6 -mt-4 rounded-b-xl absolute z-20 w-full'>
                                <li><button className='uppercase mb-1 hover:text-blue-600' onClick={() => handleSortChange('NEWEST')}>Newest</button></li>
                                <li><button className='uppercase mb-1 hover:text-blue-600' onClick={() => handleSortChange('PRICE ASC')}>Price Asc</button></li>
                                <li><button className='uppercase mb-1 hover:text-blue-600' onClick={() => handleSortChange('PRICE DESC')}>Price Desc</button></li>
                            </ul>
                        }
                    </div>
                </div>
                <div className='py-5'>
                    <h2 className='text-xl font-semibold'>New Drops</h2>
                    <p>{ProductsCount} items</p>
                </div>
            </div>
            
            <div className='lg:grid grid-cols-4 gap-3'>
                <div className='hidden lg:block'>
                    <h2 className='text-xl font-semibold ml-2 mb-4'>Filters</h2>
                    <Filters Colors={Colors} colorFilters={colorFilters} setColorFilters={setColorFilters} Sizes={Sizes} sizeFilters={sizeFilters} setSizeFilters={setSizeFilters} Categories={Categories} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters}/>
                </div>
                
                <div className='col-span-3 lg:mt-4'>
                    {currentProducts.length > 0 ? (
                        <ProductList products={currentProducts} images={images} />
                    ): (
                        <p className='text-center text-gray-500'>No products found.</p>
                    )}  
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
        </div>
    );
}