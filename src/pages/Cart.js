import React from 'react';
import CartList from '../components/CartList';
const Cart = ({ changeCount }) => {
  return (
    <div>
      <CartList changeCount={changeCount} />
    </div>
  );
};

export default Cart;
