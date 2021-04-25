const express = require('express');

const app = express();
const PORT = 3000;

const htmlPage = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>From SSR with Love</title>
    </head>
    <body>
      <div>Контент приложения</div>
    </body>
  </html>
`;

app.get('/', (req, res) => {
  res.send(htmlPage);
});

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
