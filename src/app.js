const express = require('express');
const router = require('./router');
const app = express();
app.use(express.json());
app.use(router);

app.get('/', (request, response) => response.status(200).send('API está funcionando corretamente!'));

module.exports = app;