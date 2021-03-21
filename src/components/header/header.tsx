import React from 'react';
import './header.pcss';
import logo from '../../assets/bg1.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;
