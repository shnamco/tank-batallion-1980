import React from 'react';
import { SignupForm } from './components/signup_form/signup_form';
import './signup.pcss';

export const Signup: React.FC = () => {
  return (
    <div className="arcade__background arcade__background-all arcade-signup">
      <SignupForm />
    </div>
  );
};
