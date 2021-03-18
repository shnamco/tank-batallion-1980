import React from 'react';
import './header.pcss';
import logo from '../../assets/bg1.png';

export const Header = (): JSX.Element => {
  return (
    <header className="header">
      <img src={logo} alt="" />
    </header>
  );
};
