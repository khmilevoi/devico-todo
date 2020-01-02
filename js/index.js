window.onload = () => {
  const todoManager = new TodoManager();
  const todosContainer = document.getElementById("todos");

  const todo = new Todo(todoManager, todosContainer);

  const todoText = document.getElementById("addTodoText");
  const todoForm = document.getElementById("controls");

  todoForm.addEventListener("submit", event => {
    event.preventDefault();

    const inner = todoText.value;
    todo.dispatch(actions.ADD, inner, todoManager);

    todoText.value = "";
  });

  todo.draw(todosContainer, todoManager);
};
