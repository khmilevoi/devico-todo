const createMarkup = (root) => {
  const header = document.createElement('header');
  header.classList.add('header');

  const auth = document.createElement('div');
  auth.classList.add('auth');

  header.append(auth);

  const todos = document.createElement('div');
  todos.classList.add('todos');

  const controls = document.createElement('form');
  controls.classList.add('controls');

  const addTodoText = document.createElement('input');
  addTodoText.classList.add('addTodoText');

  const addTodoButton = document.createElement('button');
  addTodoButton.classList.add('addTodoButton');
  addTodoButton.type = 'submit';
  addTodoButton.innerHTML = '+';

  controls.append(addTodoText, addTodoButton);

  root.append(header, todos, controls);
  addTodoText.focus();
};

window.onload = async () => {
  const root = document.body;

  createMarkup(root);

  const ws = new WebService(3000);

  const auth = new Auth(ws);
  const [authContainer] = root.getElementsByClassName('auth');

  const login = new Login(auth, authContainer);

  ws.setHeadersCreator(() => {
    if (auth.user) {
      return { Authorization: `Bearer ${auth.user.token}` };
    }

    return {};
  });

  login.draw(() => {
    // const todoManager = new TodosManager();
    const todoManager = new TodosManagerServer(ws);
    const [todosContainer] = root.getElementsByClassName('todos');
    todosContainer.innerHTML = '';

    const todo = new Todos(todoManager, todosContainer);

    const [todoText] = document.getElementsByClassName('addTodoText');
    const [todoForm] = document.getElementsByClassName('controls');

    todoForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const inner = todoText.value;

      if (inner.trim().length === 0) return;

      todo.todoManager.dispatch(actions.TODOS.ADD, inner, (newTodo) => {
        todosContainer.append(todo.createTodoElement(newTodo));
        todoText.value = '';
      });
    });

    todo.draw();
  });
};
