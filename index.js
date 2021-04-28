const { ssr } = require('./dist/server.js');

const port = process.env.PORT || 4000;

ssr.listen(port, () => {
    console.log('Application is started on localhost:', port);
});
