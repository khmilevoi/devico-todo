/* eslint-disable no-console */

import Koa from 'koa';
import cors from 'koa-cors';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

import configureRouter from './controllers';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(logger());

app.use(...configureRouter());

const PORT = 3000;

app.listen(PORT).on('connection', () => {
  console.log(`Connection open to ${PORT}`);
});

const connString = 'mongodb://localhost/todo';
mongoose.connect(connString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Open to ${connString}`);
});

db.on('error', (err) => {
  console.log(err);
});
