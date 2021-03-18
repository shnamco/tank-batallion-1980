import React from 'react';
import { Form } from '../form/form';
import { Header } from '../header/header';
import './app.pcss';

export const App = (): JSX.Element => {
  return (
    <div className="container">
      <Header />
      <Form />
    </div>
  );
};
