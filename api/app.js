const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');

const authRouter = require('../auth/auth-router');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('<h2>Application is running');
});

app.use((err, req, res, next) => {
  console.log('Error:', err.message);
  res.status(500).json({
    message: 'Something went wrong. Please try again later',
    error: err.message,
  });
});

module.exports = app;
