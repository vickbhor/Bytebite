import { ShoppingCart, Donut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <Donut 
              className="w-8 h-8 text-[#ff6b00] group-hover:rotate-90 transition-transform duration-500" 
              strokeWidth={2.5} 
            />
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#ff6b00] to-red-500 bg-clip-text text-transparent">
              ByteBite
            </span>
          </Link>
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-[#ff6b00] transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}