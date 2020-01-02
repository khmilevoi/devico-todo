const Koa = require('koa');
const route = require('koa-route');

const app = new Koa();

app.use(route.get('/todos/'));

const PORT = 3000;

app.listen(PORT);
