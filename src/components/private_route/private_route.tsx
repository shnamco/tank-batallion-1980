import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@store/auth/auth.selectors';

export const Private: React.FC = ({ children }) => {
  const isLogged: boolean = useSelector(selectIsLoggedIn);

  if (isLogged) {
    return <>{children}</>;
  }

  return <Redirect to="/login" />;
};
