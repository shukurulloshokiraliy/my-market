import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:opacity-80">
              <MapPin size={16} />
              <span>Toshkent</span>
            </button>
            <Link href="/points" className="hover:opacity-80">
              Topshirish punktlari
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/help" className="hover:opacity-80">Sotuvchi bo'lish</Link>
            <Link href="/help" className="hover:opacity-80">Topshirish punktini ochish</Link>
            <Link href="/faq" className="hover:opacity-80">Savol-javob</Link>
            <Link href="/orders" className="hover:opacity-80">Buyurtmalarim</Link>
            <button className="flex items-center gap-1 hover:opacity-80">
              🇺🇿 O'zbekcha
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              uzum market
            </span>
          </Link>

          {/* Catalog Button */}
          <button className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-600 px-6 py-3 rounded-lg transition-colors">
            <Menu size={20} />
            <span className="font-medium">Katalog</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Mahsulotlar va turkumlar izlash"
              className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
              <Search size={20} />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2 hover:text-purple-600 transition-colors">
              <User size={24} />
              <span className="font-medium">Kirish</span>
            </Link>
            
            <Link href="/favorites" className="relative hover:text-purple-600 transition-colors">
              <Heart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            <Link href="/cart" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              <span className="font-medium">Savat</span>
              <span className="bg-purple-500 px-2 py-0.5 rounded-full text-sm">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-6 py-3 overflow-x-auto">
            <Link href="/category/weekly" className="flex items-center gap-2 whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              🔥 Hafta tovarlari
            </Link>
            <Link href="/category/fashion" className="flex items-center gap-2 whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              🎨 Qishki kolleksiya
            </Link>
            <Link href="/category/beauty" className="flex items-center gap-2 whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              💄 Sizning go'zalligingiz
            </Link>
            <Link href="/category/hobby" className="flex items-center gap-2 whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              🎯 Xobbi va ijod
            </Link>
            <Link href="/category/smartphones" className="flex items-center gap-2 whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              📱 Smartfonlari
            </Link>
            <Link href="/category/tourism" className="whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              Turizm, baliq ovi va ovchilik
            </Link>
            <Link href="/category/electronics" className="whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              Elektronika
            </Link>
            <Link href="/category/appliances" className="whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              Maishiy texnika
            </Link>
            <Link href="/category/clothing" className="whitespace-nowrap hover:text-purple-600 transition-colors text-sm">
              Kiyim
            </Link>
            <Link href="/more" className="whitespace-nowrap text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium">
              Yana →
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;