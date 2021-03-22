import React from 'react';
import Header from '@components/header/header';
import { SignupForm } from './components/signup_form/signup_form';

export const Signup: React.FC = () => {
  return (
    <>
      <Header />
      <SignupForm />
    </>
  );
};
