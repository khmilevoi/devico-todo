window.onload = () => {
  const root = document.body;

  root.innerHTML = `
  <div class="root">
    <div class="todos"></div>

    <form class="controls">
      <input type="text" class="addTodoText" />
      <button type="submit" class="addTodoButton">+</button>
    </form>
  </div>`;
  
  const todoManager = new TodosManager();
  const [todosContainer] = root.getElementsByClassName("todos");

  const todo = new Todos(todoManager, todosContainer);

  const [todoText] = document.getElementsByClassName("addTodoText");
  const [todoForm] = document.getElementsByClassName("controls");

  todoForm.addEventListener("submit", event => {
    event.preventDefault();

    const inner = todoText.value;
    const newTodo = todo.dispatch(actions.TODOS.ADD, inner, todoManager);

    todosContainer.append(todo.createTodoElement(newTodo));

    todoText.value = "";
  });

  todo.draw();
};
