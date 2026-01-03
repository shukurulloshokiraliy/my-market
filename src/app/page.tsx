'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './components/Card';
import { Product } from '../app/types/Api';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      id: 1,
      image: 'https://images.uzum.uz/d5aonf8jsv1neacs8a4g/main_page_banner.jpg',
      alt: 'Banner 1'
    },
    {
      id: 2,
      image: 'https://images.uzum.uz/d4rr95jtqdhgicat5s00/main_page_banner.jpg',
      alt: 'Banner 2'
    },
    {
      id: 3,
      image: 'https://images.uzum.uz/d52ldmgjsv1neacq4kp0/main_page_banner.jpg',
      alt: 'Banner 3'
    },
    {
      id: 4,
      image: 'https://images.uzum.uz/d2tdb9niub35i07jlgng/main_page_banner.jpg',
      alt: 'Banner 4'
    }
  ];

  const categories = [
    {
      id: 1,
      image: 'https://static.uzum.uz/static/promo_images/756b6f56-9d2d-414c-a9d3-37d40d1c808b',
      title: 'Onalar va bolalar uchun'
    },
    {
      id: 2,
      image: 'https://static.uzum.uz/static/promo_images/a266cae1-db3a-4b40-a984-cf9220d9b2e8',
      title: 'Arzon narxlar kafolati'
    },
    {
      id: 3,
      image: 'https://static.uzum.uz/static/promo_images/ed14619f-24fe-48ed-96f7-5d2043fc0de4',
      title: 'Zamonaviy bozor'
    },
    {
      id: 4,
      image: 'https://static.uzum.uz/static/promo_images/334e3d52-1db3-4d86-b7b2-ebba5d4a5ccf',
      title: "Erkaklarga sovg'alar"
    }
  ];

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=12');
        
        if (!response.ok) {
          throw new Error('Ma\'lumot yuklashda xatolik');
        }
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
      
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden mb-6 group">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {category.title}
              </span>
            </div>
          ))}
        </div>

 
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Mashhur</h2>
          <div className="h-1 w-20 bg-purple-600 rounded mb-6"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}