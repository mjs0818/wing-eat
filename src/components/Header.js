import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({ count }) => {
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  return (
    <>
      {isPc ? (
        <div className="header">
          <div className="header-top">
            <div className="count">{count}</div>
            <Link to="/cart">장바구니</Link>
          </div>
          <div className="header-main">
            <Link to="/">
              <img
                src="https://image.wingeat.com/logo/images/we_logo_center.png"
                alt="logo"
              />
            </Link>
          </div>
        </div>
      ) : (
        <div className="header-mobile">
          <div className="mobile-main">
            <Link to="/">
              <img
                src="https://image.wingeat.com/logo/images/we_logo_center.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="mobile-top">
            <div className="count">{count}</div>
            <Link to="/cart">장바구니</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
