import Header from '../../components/header/header';
import LoginForm from './components/loginForm/loginForm';
import React from 'react';
import './login.pcss';

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};
