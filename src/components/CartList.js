import React, { useState, useEffect } from 'react';
import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
  RiCloseLine,
} from 'react-icons/ri';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import './CartList.scss';

const CartList = ({ changeCount }) => {
  const [items, setItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('items')) {
      const items = JSON.parse(localStorage.getItem('items'));
      setItems(items.map((item) => ({ ...item, checked: true })));
    }
  }, []);

  const onIncrease = (id) => {
    const update = items.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setItems(update);
  };
  const onDecrease = (id) => {
    const update = items.map((item) =>
      item.id === id
        ? item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
        : item
    );
    setItems(update);
  };
  const onToggle = (id) => {
    const update = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(update);
  };

  const onRemove = (id) => {
    const update = items.filter((item) => {
      return item.id !== id;
    });
    setItems(update);
    localStorage.removeItem('items');

    localStorage.setItem('items', JSON.stringify(update));
    changeCount(update.length);
  };
  useEffect(() => {
    let price = 0;
    if (items) {
      items.forEach((item) => {
        if (item.checked) price += item.price * item.amount;
      });
    }
    setTotalPrice(price);
  }, [items]);

  return (
    <div className="cart-main">
      <h1>장바구니</h1>
      <div className="cart-info">
        <div className="cart-list">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div className="cart-item">
                <div className="item-top">
                  <div className="checkbox" onClick={() => onToggle(item.id)}>
                    {item.checked ? (
                      <RiCheckboxCircleLine />
                    ) : (
                      <RiCheckboxBlankCircleLine />
                    )}
                  </div>
                  <div className="item-name">{item.itemName}</div>
                  <div className="remove" onClick={() => onRemove(item.id)}>
                    <RiCloseLine />
                  </div>
                </div>
                <div className="item-info">
                  <div className="item-img">
                    <img
                      src={`https://image.wingeat.com/${item.image}`}
                      alt="item-img"
                    />
                  </div>
                  <div className="item-option">
                    <div className="option-price">
                      {item.price.toLocaleString()}원
                    </div>
                    <div className="option-button">
                      <AiOutlineMinusSquare
                        onClick={() => onDecrease(item.id)}
                      />
                      <input
                        type="text"
                        value={item.amount}
                        disabled
                        size="1"
                      />
                      <AiOutlinePlusSquare
                        onClick={() => onIncrease(item.id)}
                      />
                    </div>
                  </div>
                </div>
                <div className="total-price">
                  합계: {(item.price * item.amount).toLocaleString()}원
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">장바구니에 담긴 상품이 없습니다</div>
          )}
        </div>
        <div className="cart-price">
          <div className="price-wrapper">
            <div className="text">결제 예정 금액</div>
            <div className="total">
              {totalPrice && totalPrice.toLocaleString()}원
            </div>
          </div>
          <button className="order-button">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
