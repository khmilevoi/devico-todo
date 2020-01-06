import Router from 'koa-router';

import todosController from './todos';

export default function configureRouter() {
  const router = new Router({ prefix: '/todos' });

  router.get('/', todosController.list);
  router.get('/:id', todosController.todo);
  router.post('/add', todosController.add);
  router.put('/toggle/:id', todosController.toggle);
  router.delete('/delete/:id', todosController.delete);
  router.put('/update/:id', todosController.update);

  return [router.routes(), router.allowedMethods()];
}
