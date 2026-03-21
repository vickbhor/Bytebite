import { Plus } from "lucide-react";
import { MenuItem } from "../types";
import { useCart } from "../context/CartContext";

interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="relative bg-white rounded-xl overflow-hidden border shadow-sm transition-transform hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover" 
          loading="lazy" 
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-lg text-gray-900">₹{item.price}</span>
          <button
            onClick={() => addToCart(item)}
            disabled={!item.isAvailable}
            className="flex items-center gap-1 bg-[#ff6b00] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} /> ADD
          </button>
        </div>
      </div>
    </div>
  );
}