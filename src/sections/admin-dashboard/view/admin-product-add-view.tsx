"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, UploadCloud, X } from 'lucide-react';
import ImageRegular from '@/components/icons/image';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { IProduct, IProductCreate } from '@/interfaces/product';
import { IProductVariant, IVariantCreate } from '@/interfaces/variant';
import { useToast } from '@/context/toast-context';
import { IImageCreate } from '@/interfaces/image';
import { IApiResponse } from '@/interfaces/api-response';
import { createProduct } from '@/apis/product';
import { createVariant } from '@/apis/variant';
import { uploadImage } from '@/apis/image';

// +++ IMPORTS MỚI +++
import { getBrands } from '@/apis/brand';
import { getCategories } from '@/apis/category';
import { IBrand } from '@/interfaces/brand';
import { ICategory } from '@/interfaces/category';
// ++++++++++++++++++++

const MAX_IMAGES = 4;

export default function ProductCreateView() { 
  const router = useRouter();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  
  const [product, setProduct] = useState<IProductCreate>({
    productName: '',
    price: 0,
    description: '',
    brandId: '',
    categoryId: '',
  });
  
  const [variants, setVariants] = useState<IVariantCreate[]>([]);
  
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // +++ STATE MỚI ĐỂ LƯU DANH SÁCH BRAND/CATEGORY +++
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    
    if (name === 'quantity' || name === 'price') {
      updatedVariants[index] = { ...updatedVariants[index], [name]: parseFloat(value) || 0 };
    } else {
      updatedVariants[index] = { ...updatedVariants[index], [name]: value };
    }
    
    setVariants(updatedVariants);
  };

  const addVariant = () => { setVariants([...variants, { size: '', color: '', sku: '', quantity: 0, price: 0 } ]); };
  const removeVariant = (index: number) => { setVariants(variants.filter((_, i) => i !== index)); };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentTotalImages = galleryImages.length;
    const newFilesCount = acceptedFiles.length;

    if (currentTotalImages + newFilesCount > MAX_IMAGES) {
      showToast(`Giới hạn tối đa là ${MAX_IMAGES} ảnh.`, 'warning');
      return;
    }

    setNewFiles(prev => [...prev, ...acceptedFiles]);
    
    const newImagePreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setGalleryImages(prev => [...prev, ...newImagePreviews]);

    if (!coverImage && newImagePreviews[0]) {
      setCoverImage(newImagePreviews[0]);
    }

  }, [galleryImages, coverImage, showToast]);

  const isGalleryFull = galleryImages.length >= MAX_IMAGES;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    disabled: isGalleryFull
  });

  const handleRemoveImage = (e: React.MouseEvent, imageToRemove: string) => {
    e.stopPropagation(); 
    
    const fileToRemove = newFiles.find(file => URL.createObjectURL(file) === imageToRemove);
    
    setGalleryImages(prev => prev.filter(img => img !== imageToRemove));
    if (fileToRemove) {
        setNewFiles(prev => prev.filter(file => file !== fileToRemove));
    }
    
    if (coverImage === imageToRemove) {
      setCoverImage(null);
    }
    console.log("Đã xóa ảnh (preview):", imageToRemove);
  };
  
  const handleSetCoverImage = (imageToSet: string) => {
    setCoverImage(imageToSet);
  };

  // +++ USEEFFECT MỚI ĐỂ GỌI API GET BRANDS VÀ CATEGORIES +++
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API song song
        const [brandResponse, categoryResponse] = await Promise.all([
          getBrands(),
          getCategories()
        ]);

        // Xử lý brand
        if (brandResponse.data) {
          setBrands(brandResponse.data);
        } else {
          showToast('Failed to fetch brands', 'error');
        }
        
        // Xử lý category
        if (categoryResponse.data) {
          console.log(categoryResponse.data);
          setCategories(categoryResponse.data);
        } else {
          showToast('Failed to fetch categories', 'error');
        }

      } catch (error) {
        console.error("Failed to fetch initial data", error);
        showToast('Error loading page data.', 'error');
      }
    };

    fetchData();
  }, []); // Thêm showToast vào dependency array
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    if (!coverImage && galleryImages.length > 0) {
      setCoverImage(galleryImages[0]);
    }
  }, [galleryImages, coverImage]);

  const handleCreate = async () => {
    setIsLoading(true);

    if (!product.productName || !product.price || !product.categoryId || !product.brandId) {
      showToast('Vui lòng điền đầy đủ thông tin sản phẩm (Tên, Giá, Danh mục, Thương hiệu).', 'error');
      setIsLoading(false);
      return;
    }
    if (newFiles.length === 0) {
      showToast('Vui lòng tải lên ít nhất 1 ảnh.', 'error');
      setIsLoading(false);
      return;
    }
    if (!coverImage) {
      showToast('Vui lòng chọn 1 ảnh làm bìa chính.', 'error');
      setIsLoading(false);
      return;
    }

    let newProductId: string | undefined = undefined;

    try {
      const productPayload: IProductCreate = {
        productName: product.productName || '',
        price: parseFloat(product.price.toString()) || 0,
        description: product.description || '',
        brandId: product.brandId || '',
        categoryId: product.categoryId || '',
      };
      console.log('Creating product with payload:', productPayload);

      const productResponse = await createProduct(productPayload)

      if (!productResponse) {
        throw new Error('Không thể tạo sản phẩm.');
      }

      newProductId = productResponse?.data;
      console.log('Product created with ID:', newProductId);

      if (variants.length > 0) {
        const variantPromises = variants.map(variant => {
          const variantPayload: IVariantCreate = {
            size: parseInt(variant.size.toString()) || 0,
            color: variant.color || '',
            sku: variant.sku || '',
            quantity: variant.quantity || 0,
            productId: newProductId!,
          };
          return createVariant(variantPayload);
        });

        const variantResults = await Promise.all(variantPromises);
        variantResults.forEach(result => {
          const res = result as any as IApiResponse<IProductVariant>;
          if (!res) {
            console.error('Tạo variant thất bại:');
          }
        });
        console.log('Variants created');
      }

      const imagePromises = newFiles.map(file => {
        const filePreviewUrl = URL.createObjectURL(file);
        const isCover = (coverImage === filePreviewUrl);

        const imageDto: IImageCreate = {
          isMain: isCover,
          refId: newProductId!,
          type: 'product',
        };
        
        return uploadImage(imageDto, file);
      });

      const imageResults = await Promise.all(imagePromises);
      imageResults.forEach(result => {
        const res = result as any as IApiResponse<any>;
        if (!res) {
          console.error('Upload ảnh thất bại:');
        }
      });
      console.log('Images uploaded');

      showToast('Tạo sản phẩm mới thành công!', 'success');
      router.push('/products');

    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định.';
      showToast(`Lỗi: ${errorMessage}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col gap-6 p-6 max-h-[90vh] overflow-y-auto scrollbar-hide">
      <div>
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-base-content/70 text-sm">Home &gt; All Products &gt; Add New Product</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 bg-white gap-6 rounded-2xl p-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="gap-6">
              <div className="form-control gap-4">
                <label className="font-semibold"><span className="label-text">Product Name</span></label>
                <input type="text" name="productName" value={product.productName || ''} onChange={handleProductChange} className="input input-bordered" placeholder="e.g., Adidas Ultra boost" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description</span></label>
                <textarea name="description" value={product.description || ''} onChange={handleProductChange} className="textarea textarea-bordered h-24" placeholder="Product description..."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Base Price</span></label>
                  <input type="number" name="price" value={product.price || 0} onChange={handleProductChange} className="input input-bordered" placeholder="0.00" />
                </div>
                
                {/* +++ THAY THẾ INPUT THÀNH SELECT CHO CATEGORY +++ */}
                <div className="form-control">
                  <label className="label"><span className="label-text">Category</span></label>
                  <select 
                    name="categoryId" 
                    value={product.categoryId || ''} 
                    onChange={handleProductChange} 
                    className="select select-bordered"
                  >
                    <option value="" disabled>Choose a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} {/* Giả định interface ICategory có 'name'. Sửa nếu tên thuộc tính khác */}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ++++++++++++++++++++++++++++++++++++++++++++++ */}

                {/* +++ THAY THẾ INPUT THÀNH SELECT CHO BRAND +++ */}
                <div className="form-control">
                  <label className="label"><span className="label-text">Brand Name</span></label>
                  <select 
                    name="brandId" 
                    value={product.brandId || ''} 
                    onChange={handleProductChange} 
                    className="select select-bordered"
                  >
                    <option value="" disabled>Choose a brand</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} {/* Giả định interface IBrand có 'name'. Sửa nếu tên thuộc tính khác */}
                      </option>
                    ))}
                  </select>
                </div>
                {/* +++++++++++++++++++++++++++++++++++++++++++ */}

              </div>
          </div>

          <div>
              <div className="flex justify-between items-center my-4">
                <h2 className="card-title">Product Variants</h2>
                <button className="btn btn-neutral btn-sm" onClick={addVariant} disabled={isLoading}><Plus size={16} /> Add Variant</button>
              </div>
              
              <div className="space-y-6">
                {variants.map((variant, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <button className="btn btn-error btn-xs btn-circle absolute -top-3 -right-3" onClick={() => removeVariant(index)} disabled={isLoading}><X size={14} /></button>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="form-control">
                        <label className="label"><span className="label-text">Size</span></label>
                        <input type="text" name="size" placeholder="e.g., 40" value={variant.size || ''} onChange={(e) => handleVariantChange(index, e)} className="input input-bordered input-sm" />
                      </div>
                      <div className="form-control">
                        <label className="label"><span className="label-text">Color</span></label>
                        <input type="text" name="color" placeholder="e.g., Black" value={variant.color || ''} onChange={(e) => handleVariantChange(index, e)} className="input input-bordered input-sm" />
                      </div>
                      <div className="form-control">
                        <label className="label"><span className="label-text">SKU</span></label>
                        <input type="text" name="sku" placeholder="SKU-001" value={variant.sku || ''} onChange={(e) => handleVariantChange(index, e)} className="input input-bordered input-sm" />
                      </div>
                      <div className="form-control">
                        <label className="label"><span className="label-text">Stock Qty</span></label>
                        <input type="number" name="quantity" placeholder="0" value={variant.quantity || 0} onChange={(e) => handleVariantChange(index, e)} className="input input-bordered input-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div>
              <h2 className="card-title mb-4">Product Gallery</h2>
              
              <div className='p-2 bg-gray rounded-2xl mb-4'>
                <Image 
                    src={coverImage || "https://placehold.co/600x400?text=Cover+Image"}
                    alt="Product Cover Image"
                    width={500}
                    height={500}
                    className="w-full h-auto aspect-square object-cover rounded-lg bg-base-200"
                />  
              </div>
              
              <div 
                {...getRootProps()} 
                className={`
                  border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center 
                  text-center h-48
                  ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
                  ${isGalleryFull || isLoading
                    ? 'cursor-not-allowed bg-base-200 opacity-60' 
                    : 'cursor-pointer'
                  }
                `}
              >
                <input {...getInputProps()} />
                <UploadCloud size={48} className="text-base-content/50" />
                <p className="mt-2 text-sm text-base-content/70">
                  {isGalleryFull
                    ? `Đã đạt giới hạn (${MAX_IMAGES} ảnh)`
                    : isDragActive 
                      ? 'Thả ảnh vào đây' 
                      : 'Kéo thả, hoặc click để chọn ảnh'
                  }
                </p>
                <p className="text-xs text-base-content/50">Tối đa {MAX_IMAGES} ảnh. (jpeg, png)</p>
              </div>
              
              <div className="space-y-2 mt-4">
                {galleryImages.map((image, index) => {
                  const file = newFiles.find(f => URL.createObjectURL(f) === image);
                  return (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Image 
                          src={image} 
                          alt="Thumbnail"
                          width={40} height={40}
                          className="w-10 h-10 rounded object-cover bg-base-200 flex-shrink-0"
                        />
                        <span className="text-sm truncate">
                          {file ? file.name : `New Image ${index+1}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <input 
                          type="radio" 
                          name="coverImage"
                          checked={coverImage === image}
                          onChange={() => handleSetCoverImage(image)}
                          className="radio radio-primary radio-sm"
                          title="Set as cover image"
                          disabled={isLoading}
                        />
                        <button 
                          className="btn btn-ghost btn-xs btn-circle text-error"
                          onClick={(e) => handleRemoveImage(e, image)}
                          title="Delete image"
                          disabled={isLoading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 card-body flex-row justify-end gap-4">
            <button className="btn" onClick={() => router.push('/products')} disabled={isLoading}>CANCEL</button>
            
            <button className="btn btn-neutral" onClick={handleCreate} disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner"></span> : 'SAVE PRODUCT'}
            </button>
        </div>
      </div>
    </div>
  );
}