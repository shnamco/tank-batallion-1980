import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundry } from '@components/error_boundary/error_boundary';
import { Pages } from '@pages/pages';
import './app.pcss';

export const App: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('SW ready');
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('SW registered');
        })
        .catch((err) => {
          console.log('SW fail', err);
        });
    }
  }, []);

  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ErrorBoundry>
  );
};
