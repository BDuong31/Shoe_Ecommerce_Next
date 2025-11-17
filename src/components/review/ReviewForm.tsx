// src/components/ReviewForm.tsx (Phiên bản đã cập nhật)

"use client";
import Rating from '@/sections/rating/view/rating-view';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ImageRegular, { ImageBold } from '../icons/image';

interface ReviewFormProps {
  initialRating?: number; // Giá trị sao ban đầu (optional)
  initialDescription?: string; // Mô tả ban đầu (optional)
  initialTitle?: string; // Tiêu đề ban đầu (optional)
  onSubmit: (reviewData: { title: string, rating: number, description: string, files: File[] }) => void;
  // Thêm productId nếu bạn muốn gắn đánh giá với một sản phẩm cụ thể
  // productId?: string;
}

const RatingString = [
  "Rất tệ",
  "Tệ",
  "Tạm ổn",
  "Tốt",
  "Rất tốt"
]

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  initialRating = 0, 
  initialDescription = '', 
  initialTitle = '', 
  onSubmit 
}) => {
  const [title, setTitle] = useState(initialTitle); // Thêm trường tiêu đề
  const [rating, setRating] = useState(initialRating);
  const [description, setDescription] = useState(initialDescription);
  const [files, setFiles] = useState<File[]>([]);
  const totalStars = 5;

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 3); // Giới hạn 3 ảnh như Figma
      setFiles(newFiles);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ( !description || rating === 0) {
      alert("Vui lòng nhập Tiêu đề, Mô tả và chọn Số sao.");
      return;
    }

    onSubmit({ title, rating, description, files });
    
    // Reset form sau khi submit
    setTitle('');
    setRating(0);
    setDescription('');
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      {/* Không còn trường NAME ở đây, vì popup có vẻ đã biết sản phẩm */}
      
      {/* Chọn Sao */}
      <div className="flex justify-center gap-2 mb-2">
        {[...Array(totalStars)].map((_, index) => {
          const ratingValue = index + 1;
          const ratingString = RatingString[ratingValue - 1];
          return (
            <div className="flex flex-col items-center" key={index}>
              <FaStar
                  key={index}
                  size={60}
                  className={`cursor-pointer transition-colors duration-200 
                    ${ratingValue <= rating ? 'text-yellow' : 'text-gray'}`}
                  onClick={() => handleRatingClick(ratingValue)}
              />
              <span key={index} className={`text-center w-full text-sm ${ratingValue <= rating ? 'text-yellow' : 'text-gray'}`}>{ratingString}</span>
            </div>
          );
        })}
      </div>

      {/* Trường Mô tả (Tâm tình/Mô tả chi tiết) */}
      <textarea
        placeholder="Mời bạn chia sẻ thêm cảm nhận..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full max-h-28 p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {/* 3. IMAGE UPLOAD AREA */}
      <div className="flex flex-col mb-6">
        <span className="font-semibold">Actual Product Photos (Maximum 3 Photos)</span>
        <div className="flex flex-col items-center self-center justify-center mb-2 border-2 border-dashed w-[70%] rounded-lg p-4 text-center">
          <ImageRegular />
          <label htmlFor="file-upload" className="text-gray-600 cursor-pointer ">
            <br />
            Drag your images here, or browse
            <br />
            (JPG, PNG, GIF are allowed)
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="flex space-x-2 mt-4">
            {files.map((file, index) => (
              <div key={index} className="w-20 h-20 rounded-lg bg-gray-300 flex-shrink-0 relative overflow-hidden">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Review photo ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {[...Array(3 - files.length)].map((_, index) => (
              <div key={`placeholder-${index}`} className="w-20 h-20 rounded-lg bg-gray-300 flex-shrink-0" />
            ))}
        </div>
      </div>
      {/* Nút Submit */}
      <button 
        type="submit"
        className="w-full py-3 bg-blue text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
      >
        SUBMIT REVIEW
      </button>

    </form>
  );
};

export default ReviewForm;