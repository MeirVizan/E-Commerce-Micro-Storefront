import React, { createContext, useContext, useState } from 'react';

// Create a context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.variant.id === product.variant.id);

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity and price
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += product.quantity;
      updatedCart[existingProductIndex].total_price += product.price;

      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it
      setCart([...cart, product]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
