/* eslint-disable no-console */

import Koa from 'koa';
import cors from 'koa-cors';
import route from 'koa-route';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

import todosController from './controllers/todos';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(logger());

app.use(route.get('/todos', todosController.list));
app.use(route.get('/todos/:id', todosController.todo));
app.use(route.post('/todos/add', todosController.add));
app.use(route.put('/todos/toggle/:id', todosController.toggle));
app.use(route.delete('/todos/delete/:id', todosController.delete));
app.use(route.put('/todos/update/:id', todosController.update));

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
