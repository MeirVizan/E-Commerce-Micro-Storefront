import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cart } from './pages/cart/Cart';
import { Shop } from './pages/shop/Shop';
import { Product } from './pages/product/Product';
import { CartProvider } from './store/ProductStore';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
