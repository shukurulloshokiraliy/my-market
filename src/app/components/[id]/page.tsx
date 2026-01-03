'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, Star, ChevronLeft, ChevronRight, ShoppingCart, Truck, Shield, RefreshCw } from 'lucide-react';
import Card from '../../components/Card';
import { Product } from '../../types/Api';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState(24);

  const paymentPeriods = [
    { months: 24, label: '24 oy' },
    { months: 12, label: '12 oy' },
    { months: 6, label: '6 oy' },
    { months: 3, label: '3 oy' }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        const data = await response.json();
        setProduct(data);

        const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}`);
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData.products.filter((p: Product) => p.id !== data.id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Mahsulot topilmadi</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            title="Bosh sahifaga qaytish"
            aria-label="Bosh sahifaga qaytish"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const monthlyPayment = Math.floor(product.price / selectedPaymentPeriod);
  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  const formatPrice = (price: number): string => {
    return Math.floor(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button 
            onClick={() => router.push('/')} 
            className="hover:text-purple-600"
            title="Bosh sahifaga o'tish"
            aria-label="Bosh sahifaga o'tish"
          >
            Bosh sahifa
          </button>
          <ChevronRight size={16} />
          <span className="text-gray-400">{product.category}</span>
          <ChevronRight size={16} />
          <span className="text-gray-800">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl overflow-hidden group">
              <div className="aspect-square flex items-center justify-center p-8">
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Oldingi rasm"
                    aria-label="Oldingi rasm"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Keyingi rasm"
                    aria-label="Keyingi rasm"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
                aria-label={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-purple-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    title={`Rasm ${index + 1}`}
                    aria-label={`${index + 1}-rasm`}
                  >
                    <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="bg-white rounded-2xl p-6 lg:p-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">({product.stock} sharhlar)</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{formatPrice(product.stock)}+ buyurtma</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-purple-600">{formatPrice(product.price)} so'm</span>
                <span className="text-xl text-gray-400 line-through">{formatPrice(originalPrice)} so'm</span>
              </div>

              {/* Monthly Payment Options */}
              <div className="bg-gray-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-gray-600 mb-3">Oylik to'lov</p>
                <div className="flex gap-2 mb-3">
                  {paymentPeriods.map((period) => (
                    <button
                      key={period.months}
                      onClick={() => setSelectedPaymentPeriod(period.months)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPaymentPeriod === period.months
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      title={`${period.label} muddatga`}
                      aria-label={`${period.label} to'lov muddati`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
                <div className="bg-yellow-300 text-purple-900 inline-block px-3 py-2 rounded-lg font-bold text-lg">
                  {formatPrice(monthlyPayment)} so'm/oyiga × {selectedPaymentPeriod} oy
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Miqdor</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-4 py-2 text-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Miqdorni kamaytirish"
                    aria-label="Miqdorni kamaytirish"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 text-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Miqdorni oshirish"
                    aria-label="Miqdorni oshirish"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">Omborda: {product.stock} dona</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 mb-4"
              title="Savatga qo'shish"
              aria-label="Mahsulotni savatga qo'shish"
            >
              <ShoppingCart size={24} />
              Savatga qo'shish
            </button>

            <button 
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-semibold py-4 rounded-xl transition-colors duration-200"
              title="Ertaga yetkazish"
              aria-label="Ertaga yetkazib berish"
            >
              Ertaga yetkazib beramiz
            </button>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <span>349 dona xarid qilish mumkin</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <span>Bu haftada 35 kishi sotib oldi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <span>Qaytarish oson va tez</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mahsulot haqida</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <span className="text-gray-600">Brand:</span>
                <span className="ml-2 font-semibold">{product.brand}</span>
              </div>
              <div>
                <span className="text-gray-600">Kategoriya:</span>
                <span className="ml-2 font-semibold">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Chegirma:</span>
                <span className="ml-2 font-semibold text-red-600">{product.discountPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">O'xshash mahsulotlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}