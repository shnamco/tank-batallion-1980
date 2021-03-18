import React from 'react';
import bgImg from './bg1.png';
import './Header.pcss';

const Header = () => {
  return (
    <header className="header">
      <img src={bgImg} alt="" />
    </header>
  );
};

export default Header;
