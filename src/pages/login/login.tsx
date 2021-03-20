import Header from '../../components/header/header';
import LoginForm from './components/loginForm/loginForm';
import React from 'react';
import './login.pcss';

const Login: React.FC = (): React.ReactElement => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default Login;
