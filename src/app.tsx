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
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error);
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
