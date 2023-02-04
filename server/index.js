require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes');

const { PORT } = process.env;

const app = express();

/* MIDDLEWARE */
app.use(morgan('dev'));
app.use(express.json()};

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

app.listen(PORT);
// eslint-disable-next-line
console.log(`Server listening at http://localhost:${PORT}`);
