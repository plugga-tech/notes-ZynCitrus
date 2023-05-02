const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/posts');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'posts',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Anslutning till MySQL lyckades!');
});

app.use((req, res, next) => {
  req.con = con;
  next();
});

app.get('/posts', (req, res) => {
  res.render('index', { sample: 'sample text' });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);



function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = app;