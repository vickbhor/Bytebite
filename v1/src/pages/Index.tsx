import { useState, useEffect } from "react";
import MenuItemCard from "../components/MenuItemCard";
import { Search, Megaphone } from "lucide-react"; 


import { menuItems as staticMenu } from "../data/menuItems"; 

export default function Index() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    setMenuItems(staticMenu);
  }, []);

  const categories = ["All", "Snacks", "Meals", "Beverages"];

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = filter === "All" || item.category === filter;
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      
      {/* 🚀 Modern Hero Banner with Animation 🚀 */}
      <section className="w-full bg-gradient-to-br from-orange-400 to-red-500 py-12 px-4 shadow-inner animate-fadeIn">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="bg-white/20 p-3 rounded-full shadow-lg">
            <Megaphone size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Hungry, ByteBiter? <br />
            Skip the Line, Pre-Order Now!
          </h1>
          <p className="text-white/80 text-lg max-w-xl font-medium">
            Browse our fresh daily menu and order from your phone. Collect your token in seconds.
          </p>

          {/* 🔍 Modern Search Bar 🔍 */}
          <div className="relative w-full max-w-xl mt-4">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for samosa, chai, coffee..."
              className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-100 bg-white/95 text-lg shadow-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-300 transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container py-12 px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Today's Menu ✨</h2>
          
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap text-sm transition-all shadow-sm ${
                  filter === cat 
                    ? "bg-[#ff6b00] text-white shadow-orange-500/30 shadow-md" 
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid - With empty state handling */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slideUp">
            {filteredItems.map(item => (
              <MenuItemCard key={item._id || item.id} item={item} /> 
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center gap-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
            <Megaphone size={48} className="text-gray-300" />
            <p className="text-2xl font-bold text-gray-600">Nothing found for "{searchTerm}"!</p>
            <p className="text-gray-400">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setSearchTerm(""); setFilter("All")}}
              className="px-6 py-2 bg-[#ff6b00] text-white font-bold rounded-lg mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}