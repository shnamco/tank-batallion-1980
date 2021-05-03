import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { App } from './app';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@store/core/store';

export default (req: Request, res: Response): void => {
  const location = req.url;
  const context: StaticRouterContext = {};

  const jsx = (
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <App />;
      </StaticRouter>
    </Provider>
  );

  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState));
};

function getHtml(reactHtml: string, reduxState = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
        <title>Sneakers shop</title>
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script src="/bundle.js"></script>
    </body>
    </html>
  `;
}
