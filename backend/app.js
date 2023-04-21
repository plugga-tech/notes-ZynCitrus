var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/posts', (req, res) => {
    const posts = [
        {
            title: 'Rubrik',
            desc: 'Beskrivning',
            author: 'Författare',
            createdAt: Date.now(),
        }
    ]
    res.render("index", {sample: 'sample text'})
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter)

module.exports = app;
