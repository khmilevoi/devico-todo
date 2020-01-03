window.onload = async () => {
  const root = document.body;

  root.innerHTML = `
  <div class="root">
    <div class="todos"></div>

    <form class="controls">
      <input type="text" class="addTodoText" />
      <button type="submit" class="addTodoButton">+</button>
    </form>
  </div>`;

  // const todoManager = new TodosManager();
  const todoManager = new TodosManagerServer();
  const [todosContainer] = root.getElementsByClassName('todos');

  const todo = new Todos(todoManager, todosContainer);
  await todo.todoManager.dispatch(actions.TODOS.GET_LIST);

  const [todoText] = document.getElementsByClassName('addTodoText');
  const [todoForm] = document.getElementsByClassName('controls');

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inner = todoText.value;
    const newTodo = todo.todoManager.dispatch(
      actions.TODOS.ADD,
      inner,
      todoManager,
    );

    todosContainer.append(todo.createTodoElement(newTodo));

    todoText.value = '';
  });

  todo.draw();
};
