'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Star } from 'lucide-react';
import type { Product } from '../types/Api';
import { toggleLiked, isProductLiked } from '../utils/likeStorage';
import { addToCart, getProductQuantity, updateQuantity } from '../utils/cartStorage';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);
  
  // Check if product is already liked on mount
  useEffect(() => {
    setIsFavorite(isProductLiked(product.id));
    setQuantity(getProductQuantity(product.id));
  }, [product.id]);

  // Listen for cart changes
  useEffect(() => {
    const handleCartChange = () => {
      setQuantity(getProductQuantity(product.id));
    };

    window.addEventListener('cartChanged', handleCartChange);
    return () => window.removeEventListener('cartChanged', handleCartChange);
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
  
  const badge = getBadge();

  // Navigate to detail page
  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  // Toggle favorite with localStorage
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = toggleLiked(product);
    setIsFavorite(newLikedState);
  };

  // Add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Increase quantity
  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  // Decrease quantity
  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
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
        
        {quantity === 0 ? (
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
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              className="flex-shrink-0 w-10 h-10 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg flex items-center justify-center font-bold transition-colors"
              title="Kamaytirish"
            >
              -
            </button>
            <div className="flex-1 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center font-semibold">
              {quantity}
            </div>
            <button
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="flex-shrink-0 w-10 h-10 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg flex items-center justify-center font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Oshirish"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;