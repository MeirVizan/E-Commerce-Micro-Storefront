import React, { useState } from 'react';

import { useCart } from '../../store/ProductStore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/material';
import './Cart.css';
import { imager } from '../../components/utils'

export const Cart = () => {

  // Cart state and functions from the custom hook
  const { cart, setCart } = useCart();
  const [quantities, setQuantities] = useState({});

  // Function to update quantity of a product in the cart
  const updateQuantity = (productId, quantity, index, change) => {

    // Update quantity in local state
    const updateQuantity = { ...quantities };
    if (updateQuantity[productId]) {
      updateQuantity[productId] = updateQuantity[productId] + change;
    } else {
      updateQuantity[productId] = quantity;
    }
    setQuantities({ ...updateQuantity });

    // Update quantity and total price in the cart
    const updatedCart = [...cart];
    updatedCart[index].quantity = updatedCart[index].quantity + change;
    updatedCart[index].total_price += change > 0 ? updatedCart[index].price : -updatedCart[index].price;

    setCart(updatedCart);
  };

  // Function to delete an item from the cart
  const deleteItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId)
    setCart(updatedCart);
  };

  // Calculate total price and total quantity in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity), 0);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (

    <div className="cart">
      <div className="table">
        <thead >
          <tr>
            <th>Product</th>
            <th>{ }</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th><span>&nbsp;</span></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td><span><img src={imager(item.variant.image.url ? item.variant.image.url : "", 50, 50)} alt='' /></span></td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <div className="quantity-wrapper">
                  <button
                    disabled={item.quantity < 2}
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity, index, -1)}>-
                  </button>
                  <span></span>
                  <span>{item.quantity}</span>
                  <span></span>
                  <button className="quantity-button" onClick={() => updateQuantity(item.id, item.quantity, index, 1)}>+</button>
                </div>
              </td>
              <td>${item.total_price}</td>
              <td><IconButton >
                <DeleteOutlineOutlinedIcon fontSize="small" onClick={() => deleteItem(item.id)} />
              </IconButton></td>
            </tr>
          ))}
        </tbody>
      </div>
      <div className="total-price-wapper">
        <div className="space-between" >
          <h3>Total Price</h3>
        </div>
        <div className="space-between" ><p>Total quantity</p> <p>{totalQuantity}</p></div>
        <hr />
        <div className="space-between" ><p>Total</p><p>${totalPrice}</p></div>
      </div>
    </div>
  );
};


