import React from 'react';
import { Redirect } from 'react-router-dom';
import { useLoggedIn } from '@utils/use_logged_in';

export const Private: React.FC = ({ children }) => {
  const isLogged: boolean = useLoggedIn();

  if (isLogged) {
    return <>{children}</>;
  }

  return <Redirect to="/login" />;
};
