/* eslint-disable no-console */

import Koa from 'koa';
import route from 'koa-route';
import logger from 'koa-logger';

// import mongoose from 'mongoose';

const todosController = require('./controllers/todos');

const app = new Koa();

app.use(logger());
app.use(route.get('/todos', todosController.list));

const PORT = 3000;

app.listen(PORT);

// const connString = 'mongodb://localhost:27017/test';
// mongoose.connect(connString, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// mongoose.connection.on('connected', () => {
//   console.log(`Connection open to ${connString}`);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose default connection disconnected');
// });
