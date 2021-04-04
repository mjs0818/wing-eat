import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';
import Cart from './pages/Cart';
import Header from './components/Header';

const App = () => {
  if (!localStorage.getItem('items')) {
    localStorage.setItem('itmes', '[]');
  }
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('items')) {
      setCount(JSON.parse(localStorage.getItem('items')).length);
    }
  }, []);

  const changeCount = (count) => {
    setCount(count);
  };

  return (
    <>
      <Header count={count} />
      <Route render={() => <Main changeCount={changeCount} />} path="/" exact />
      <Route render={() => <Cart changeCount={changeCount} />} path="/cart" />
    </>
  );
};

export default App;
