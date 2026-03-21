import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#fcfcfc]"> 
        <Navbar />
        <main className="flex-grow"> 
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/:id" element={<OrderConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  </BrowserRouter>
);

export default App;