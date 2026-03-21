import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmation() {
  const { id } = useParams();

  return (
    <div className="container py-20 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </div>
      
      <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-10 text-lg">Show this token at the counter to pay and collect your food.</p>
      
      <div className="bg-white border-2 border-dashed border-[#ff6b00] rounded-2xl p-8 mb-10 w-full shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#ff6b00]"></div>
        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-3">Your Digital Token</p>
        <h2 className="text-5xl font-black text-[#ff6b00] tracking-tight">{id}</h2>
      </div>

      <Link 
        to="/" 
        className="px-8 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-colors"
      >
        ← Back to Menu
      </Link>
    </div>
  );
}