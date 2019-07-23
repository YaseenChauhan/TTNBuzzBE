const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const buzzRouter = require('./api/routes/buzz');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/buzz',buzzRouter);

module.exports = app;