import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      // 🚀 THE FIX: MongoDB ko "tokenNumber" chahiye tha, jo hum ab yahan se bhej rahe hain
      const generatedToken = Math.floor(1000 + Math.random() * 9000); 

      const response = await fetch("https://bytebite-g4uq.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenNumber: generatedToken, // 👈 Token Number bhejna zaroori hai!
          items: cart,
          totalAmount: cartTotal,
          customerName: "Vibhor", // Ise baad me user se input le sakte ho
        }),
      });

      if (!response.ok) {
        throw new Error("Order place karne mein problem aayi");
      }

      const data = await response.json();
      
      // Agar backend naya id na de paye toh humara generated token hi orderId ban jayega
      const orderId = data._id || data.tokenNumber || generatedToken; 

      clearCart();
      
      // 🎉 Success ka dhamaaka!
      alert(`🎉 Order Successful!\n\nTera Token No: #${data.tokenNumber || generatedToken}\nCounter pe jaake ye token dikhao aur paise de dena! 💸`);
      
      // Order confirmation page pe le jao
      navigate(`/order/${orderId}`);

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Oops! Order nahi lag paya, server check karo bhai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-20 px-4 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty 🥺</h2>
        <p className="text-gray-500 mb-6">Bhukkad bhai, kuch toh add karo menu se!</p>
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
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Order 🛒</h1>
      
      <div className="space-y-4 mb-8">
        {cart.map((item) => {
          const currentId = item._id || item.id;
          return (
            <div key={currentId} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-[#ff6b00] font-semibold">₹{item.price}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => updateQuantity(currentId, item.quantity - 1)} 
                    className="p-1.5 bg-white rounded shadow-sm text-gray-600 hover:text-black"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(currentId, item.quantity + 1)} 
                    className="p-1.5 bg-white rounded shadow-sm text-gray-600 hover:text-black"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(currentId)} 
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 bg-gray-50 border rounded-xl">
        <div className="flex justify-between items-center text-xl font-black text-gray-900 mb-6">
          <span>Total Amount</span>
          <span className="text-[#ff6b00]">₹{cartTotal}</span>
        </div>
        <button 
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full py-4 bg-[#ff6b00] text-white font-bold text-lg rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Wait karo, Token aa raha hai...
            </>
          ) : (
            "Confirm Order & Get Token"
          )}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Note: Payment counter pe cash mein hogi.
        </p>
      </div>
    </div>
  );
}