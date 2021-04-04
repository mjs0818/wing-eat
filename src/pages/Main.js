import React from 'react';
import Feature from '../components/Feature';
import List from '../components/List';

const Main = ({ changeCount }) => {
  return (
    <div>
      <Feature />
      <List changeCount={changeCount} />
    </div>
  );
};

export default Main;
