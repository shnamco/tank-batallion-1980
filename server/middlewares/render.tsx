import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { Helmet, HelmetData } from 'react-helmet';
import { App } from '../../src/app';
import { RootState, store } from '@store/core/store';
import * as AuthActions from '@store/auth/auth.actions';

const getHtml = (reactHtml: string, state: RootState, helmetData: HelmetData): string => `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Tank Battalion 1980</title>
        ${helmetData.meta.toString()}
      </head>

      <body>
        <div id="root">${reactHtml}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\\u003c')}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
`;

export const renderMiddleware = async (request: Request, response: Response): Promise<void> => {
  const location: string = request.url;

  if (!response.locals.user) {
    await store.dispatch(AuthActions.logInRedirectAction());
  }

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactHtml = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  const state = store.getState();

  response.status(200).send(getHtml(reactHtml, state, helmetData));
};
