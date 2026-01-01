import Link from 'next/link';
import { Instagram, Send, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Biz haqimizda */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Biz haqimizda</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/points" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Topshirish punktlari
                </Link>
              </li>
              <li>
                <Link href="/vacancies" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Vakansiyalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Foydalanuvchilarga */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Foydalanuvchilarga</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Biz bilan bog'lanish
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Savol-Javob
                </Link>
              </li>
            </ul>
          </div>

          {/* Tadbirkorlarga */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tadbirkorlarga</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sell" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Uzumda sotish
                </Link>
              </li>
              <li>
                <Link href="/seller-login" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Sotuvchi kabinetiga kirish
                </Link>
              </li>
              <li>
                <Link href="/open-point" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Topshirish punktini ochish
                </Link>
              </li>
            </ul>
          </div>

          {/* Ilovani yuklab olish */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ilovani yuklab olish</h3>
            <div className="space-y-3">
              <Link 
                href="https://apps.apple.com" 
                target="_blank"
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-purple-600 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <span className="text-sm font-medium text-gray-900">AppStore</span>
              </Link>
              
              <Link 
                href="https://play.google.com" 
                target="_blank"
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-purple-600 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#4285F4"/>
                </svg>
                <span className="text-sm font-medium text-gray-900">Google Play</span>
              </Link>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Uzum ijtimoly tarmoqlarda</h3>
              <div className="flex items-center gap-3">
                <Link 
                  href="https://instagram.com" 
                  target="_blank"
                  className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Instagram size={20} />
                </Link>
                <Link 
                  href="https://t.me" 
                  target="_blank"
                  className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Send size={20} />
                </Link>
                <Link 
                  href="https://facebook.com" 
                  target="_blank"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Facebook size={20} />
                </Link>
                <Link 
                  href="https://youtube.com" 
                  target="_blank"
                  className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-purple-600 transition-colors">
                Maxfiylik kelishuvi
              </Link>
              <Link href="/terms" className="hover:text-purple-600 transition-colors">
                Foydalanuvchi kelishuvi
              </Link>
              <Link href="/data-processing" className="hover:text-purple-600 transition-colors uppercase">
                Shaxsiy ma'lumotlarni qayta ishlash nizomi «Uzum Market» MCHJ XK
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              ©2026© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;