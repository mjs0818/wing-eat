import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import './List.scss';

const List = ({ changeCount }) => {
  const [items, setItems] = useState([]);
  // const [page, setPage] = useState(1);
  let page = useRef(1);
  const getItems = async () => {
    try {
      const res = await axios.get(
        `https://node.wingeat.com/test-api/items?page=${page.current}`
      );
      setItems((prev) => prev.concat(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const onClick = ({ itemName, price, image, id }) => {
    const itemList = JSON.parse(localStorage.getItem('items'));
    let isExist = false;
    let update = [];
    if (itemList) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].id === id) {
          isExist = true;
          update = [
            ...update,
            { ...itemList[i], amount: itemList[i].amount + 1 },
          ];
        } else {
          update = [...update, { ...itemList[i] }];
        }
      }
    }
    if (!isExist) {
      update.push({ itemName, price, image, id, amount: 1 });
    }

    localStorage.setItem('items', JSON.stringify(update));
    changeCount(update.length);
    alert('상품이 추가되었습니다.');
  };

  const infiniteScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    const scrollTop = Math.ceil(
      Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      if (page.current < 6) {
        page.current = page.current + 1;
        getItems();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infiniteScroll]);

  return (
    <>
      <div className="title">
        <h1>윙잇 MADE</h1>
      </div>
      <div className="list">
        {items
          ? items.map((item) => (
              <div key={item.id} className="list-item">
                <img
                  src={`https://image.wingeat.com/${item.image}`}
                  alt="item-img"
                  onClick={() => onClick(item)}
                />
                <div className="item-name">{item.itemName}</div>
                <div className="item-price">
                  {item.price.toLocaleString()}원
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default List;
