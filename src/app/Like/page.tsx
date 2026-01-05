'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import type { Product } from '../types/Api';
import { getLikedProducts, clearAllLiked, removeFromLiked } from '../utils/likeStorage';

const Like = () => {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLikedProducts = () => {
    setLoading(true);
    const liked = getLikedProducts();
    setLikedProducts(liked);
    setLoading(false);
  };

  useEffect(() => {
    loadLikedProducts();

    // Listen for changes to liked products
    const handleLikedChange = () => {
      loadLikedProducts();
    };

    window.addEventListener('likedProductsChanged', handleLikedChange);
    
    return () => {
      window.removeEventListener('likedProductsChanged', handleLikedChange);
    };
  }, []);

  const handleClearAll = () => {
    if (confirm('Barcha sevimli mahsulotlarni o\'chirmoqchimisiz?')) {
      clearAllLiked();
      setLikedProducts([]);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    removeFromLiked(productId);
    setLikedProducts(prev => prev.filter(p => p.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Bosh sahifaga qaytish"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Saralangan mahsulotlar
            </h1>
            <p className="text-gray-600 mt-1">
              {likedProducts.length} ta mahsulot
            </p>
          </div>
        </div>

        {/* Content */}
        {likedProducts.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center">
                <Heart size={48} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Saralangan mahsulotlar yo'q
              </h2>
              <p className="text-gray-600 mb-6">
                Yoqtirgan mahsulotlaringizni saqlash uchun yurak belgisini bosing
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Mahsulotlarni ko'rish
              </Link>
            </div>
          </div>
        ) : (
          // Products Grid
          <div>
            {/* Stats Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="text-purple-600" size={20} />
                <span className="font-medium text-gray-700">
                  {likedProducts.length} ta sevimli mahsulot
                </span>
              </div>
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Hammasini o'chirish
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedProducts.map((product) => (
                <div key={product.id} className="relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="absolute top-2 right-2 z-20 bg-white hover:bg-red-50 p-2 rounded-full shadow-lg transition-all"
                    aria-label="O'chirish"
                    title="Sevimlilardan o'chirish"
                  >
                    <Heart className="w-5 h-5 fill-purple-500 text-purple-500" />
                  </button>
                  
                  {/* Product Card */}
                  <Card product={product} />
                </div>
              ))}
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-8 bg-white rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    Yana mahsulotlar qo'shishni xohlaysizmi?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Katalogda minglab mahsulotlar mavjud
                  </p>
                </div>
                <Link
                  href="/"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  Mahsulotlarni ko'rish
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Like;