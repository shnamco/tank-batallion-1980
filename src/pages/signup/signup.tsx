import React from 'react';
import Header from '../../components/header/header';
import SignupForm from './components/signupForm/signupForm';

const Signup: React.FC = (): React.ReactElement => {
  return (
    <>
      <Header />
      <SignupForm />
    </>
  );
};

export default Signup;
