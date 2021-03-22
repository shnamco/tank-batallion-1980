import React from 'react';
import Header from '../../components/header/header';
import { SignupForm } from './components/signupForm/signupForm';

export const Signup: React.FC = () => {
  return (
    <>
      <Header />
      <SignupForm />
    </>
  );
};
