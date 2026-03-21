import { Target } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center gap-3">
        {}
        <p className="text-xl font-extrabold text-[#ff6b00] tracking-tight">
          "Made with love !" 🍔🧡
        </p>
        
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <Target size={14} />
          <span>ByteBite - A College Canteen Initiative - {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}