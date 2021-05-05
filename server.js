const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const options = {
  key: fs.readFileSync(__dirname + '/local.ya-praktikum.tech-key.pem'),
  cert: fs.readFileSync(__dirname + '/local.ya-praktikum.tech.pem'),
};

const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const server = https.createServer(options, app);

server.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}!`);
});
