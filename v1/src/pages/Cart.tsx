import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  //  NAYA: Asli Backend Call
  const handleCheckout = async () => {
    try {
      // 1. Apna Render wala URL yahan daal dhyan se
      const response = await fetch("https://bytebite-backend.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Hum token khud nahi bana rahe, backend banayega, bas items aur total bhej rahe hain
          items: cart,
          totalAmount: cartTotal,
        }),
      });

      if (!response.ok) {
        throw new Error("Order place karne mein problem aayi");
      }

      // 2. Database se naya token aayega
      const data = await response.json();
      const realTokenId = data.tokenId; 

      // 3. Cart khali karo aur order page pe bhejo
      clearCart();
      navigate(`/order/${realTokenId}`);

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Oops! Order nahi lag paya, please thodi der mein try karna.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-20 px-4 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty 🥺</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => navigate("/")} 
          className="w-full px-6 py-3 bg-[#ff6b00] text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Order</h1>
      
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{item.name}</h3>
              <p className="text-[#ff6b00] font-semibold">₹{item.price}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 bg-white rounded shadow-sm text-gray-600 hover:text-black">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 bg-white rounded shadow-sm text-gray-600 hover:text-black">
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 border rounded-xl">
        <div className="flex justify-between items-center text-xl font-black text-gray-900 mb-6">
          <span>Total Amount</span>
          <span className="text-[#ff6b00]">₹{cartTotal}</span>
        </div>
        <button 
          onClick={handleCheckout}
          className="w-full py-4 bg-[#ff6b00] text-white font-bold text-lg rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
        >
          Confirm Order & Get Token
        </button>
      </div>
    </div>
  );
}