'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Star } from 'lucide-react';
import type { Product } from '../types/Api';
import { toggleLiked, isProductLiked } from '@/app/utils/likeStorage';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if product is already liked on mount
  useEffect(() => {
    setIsFavorite(isProductLiked(product.id));
  }, [product.id]);
  
  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  
  const formatPrice = (price: number): string => {
    return Math.floor(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  
  const getBadge = () => {
    if (product.discountPercentage > 15) {
      return { text: 'SUPERNARX', color: 'bg-orange-500' };
    } else if (product.stock < 20) {
      return { text: 'CHEKLANGAN', color: 'bg-red-500' };
    } else if (product.rating > 4.5) {
      return { text: 'ORIGINAL', color: 'bg-green-500' };
    }
    return null;
  };
  


  // Navigate to detail page
  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  // Toggle favorite with localStorage
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Toggle in localStorage
    const newLikedState = toggleLiked(product);
    setIsFavorite(newLikedState);
  };

  // Prevent navigation when clicking add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Savatga qo\'shildi:', product.title);
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-120 cursor-pointer"
    >
      <div className="relative p-6 h-64">
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:scale-110 transition-transform z-10"
          aria-label="Sevimlilar ro'yxatiga qo'shish"
          title="Sevimlilar ro'yxatiga qo'shish"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-purple-500 text-purple-500' : 'text-gray-400'}`}
          />
        </button>
        
        <div className="relative h-full flex items-center justify-center">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-purple-600">
              {formatPrice(product.price)} so'm
            </span>
          </div>
          <div className="text-gray-400 line-through text-sm">
            {formatPrice(originalPrice)} so'm
          </div>
        
        </div>
    
        <h3 className="text-sm text-gray-700 mb-2 line-clamp-2 flex-1">
          {product.title} - {product.brand}
        </h3>
  
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm">{product.rating.toFixed(1)}</span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3"
          title="Savatga qo'shish"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ertaga
        </button>
      </div>
    </div>
  );
};

export default Card;