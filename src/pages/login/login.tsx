import { Header } from '../../components/header/header';
import { Form } from './components/form/form';
import React from 'react';
import './login.pcss';

export const Login = (): JSX.Element => {
  return (
    <>
      <Header />
      <Form />
    </>
  );
};
