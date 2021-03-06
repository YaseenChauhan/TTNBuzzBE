const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const userRouter = require('./api/routes/user');
const buzzRouter = require('./api/routes/buzz');
const complaintRouter = require('./api/routes/complaint');

mongoose.connect('mongodb+srv://Yaseen:123@Myyaks' + '@node-rest-9hyr9.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, POST, GET');
    }
    next();
})
app.use('/users', userRouter);
app.use('/buzz', buzzRouter);
app.use('/complaint', complaintRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    if (error) {
        res.json({
        error: {
            message: error.message
        }
    });
    }
    res.status(error.status || 500);
})


module.exports = app;