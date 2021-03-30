import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundry } from '@components/error_boundary/error_boundary';
import { Pages } from '@pages/pages';
import './app.pcss';

export const App: React.FC = () => {
  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ErrorBoundry>
  );
};
