'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import type { CartItem } from '../utils/cartStorage';
import { 
  getCartItems, 
  updateQuantity, 
  removeFromCart, 
  clearCart
} from '../utils/cartStorage';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    const items = getCartItems();
    setCartItems(items);
    setSelectedItems(new Set(items.map(item => item.id)));
    setLoading(false);
  };

  useEffect(() => {
    loadCart();

    const handleCartChange = () => {
      loadCart();
    };

    window.addEventListener('cartChanged', handleCartChange);
    return () => window.removeEventListener('cartChanged', handleCartChange);
  }, []);

  const formatPrice = (price: number): string => {
    return Math.floor(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const handleSelectItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleIncrease = (item: CartItem) => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    const newSelected = new Set(selectedItems);
    newSelected.delete(id);
    setSelectedItems(newSelected);
  };

  const getSelectedTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSelectedOriginalTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => {
        const originalPrice = item.price / (1 - item.discountPercentage / 100);
        return total + (originalPrice * item.quantity);
      }, 0);
  };

  const getSelectedSavings = () => {
    return getSelectedOriginalTotal() - getSelectedTotal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Bosh sahifaga qaytish"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Savatingiz</h1>
          </div>

          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center">
                <ShoppingCart size={48} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Savatingiz bo'sh
              </h2>
              <p className="text-gray-600 mb-6">
                Mahsulotlarni savatga qo'shish uchun katalogga o'ting
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Mahsulotlarni ko'rish
              </Link>
            </div>
          </div>
        </div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Savatingiz, <span className="text-gray-500">{cartItems.length} mahsulot</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <div className="bg-white rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                  onChange={handleSelectAll}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  aria-label="Hammasini tanlash"
                />
                <span className="font-medium text-gray-700">Hammasini tanlash</span>
              </label>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 sm:p-6">
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <div className="shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      aria-label={`${item.title} tanlash`}
                    />
                  </div>

                  {/* Image */}
                  <div className="shrink-0">
                    <Link href={`/product/${item.id}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-gray-200"
                      />
                    </Link>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-sm sm:text-base font-medium text-gray-800 hover:text-purple-600 line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Sotuvchi: {item.brand}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Miqdorni kamaytirish"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 min-w-10 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item)}
                          disabled={item.quantity >= item.stock}
                          className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Miqdorni oshirish"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${item.title} o'chirish`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-bold text-purple-600">
                        {formatPrice(item.price * item.quantity)} so'm
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice((item.price / (1 - item.discountPercentage / 100)) * item.quantity)} so'm
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Buyurtmangiz</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Mahsulotlar ({selectedItems.size}):</span>
                  <span className="font-medium">{formatPrice(getSelectedTotal())} so'm</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Jami:</span>
                  <span className="text-purple-600">{formatPrice(getSelectedTotal())} so'm</span>
                </div>
                {getSelectedSavings() > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Tejovingiz:</span>
                    <span className="font-semibold">{formatPrice(getSelectedSavings())} so'm</span>
                  </div>
                )}
              </div>

              <button
                disabled={selectedItems.size === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Rasmiylashtirish"
              >
                Rasmiylashtrishga o'tish
              </button>

              <button
                onClick={() => {
                  if (confirm('Savatingizni tozalamoqchimisiz?')) {
                    clearCart();
                  }
                }}
                className="w-full mt-3 text-red-600 hover:text-red-700 font-medium py-2 transition-colors"
                aria-label="Savatni tozalash"
              >
                Savatni tozalash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;