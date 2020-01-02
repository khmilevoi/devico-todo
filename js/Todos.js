class Todos {
  constructor(todoManager, todosContainer) {
    this.todoManager = todoManager;
    this.todosContainer = todosContainer;
  }

  draw() {
    this.todosContainer.innerHTML = "";

    this.todoManager.todos.forEach(todo => {
      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo");

      if (todo.completed) {
        todoContainer.classList.add("completed");
      }

      const toggleButton = document.createElement("input");
      toggleButton.classList.add("todo-checkbox");
      toggleButton.type = "checkbox";
      toggleButton.checked = todo.completed;

      toggleButton.addEventListener("click", event => {
        event.preventDefault();

        this.dispatch(actions.TOGGLE, todo.id);
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("todo-delete");
      deleteButton.innerHTML = "delete";

      deleteButton.addEventListener("click", event => {
        event.preventDefault();

        this.dispatch(actions.DELETE, todo.id);
      });

      const inner = document.createElement("div");
      inner.classList.add("todo-inner");
      inner.innerHTML = todo.inner;

      todoContainer.append(toggleButton, inner, deleteButton);

      this.todosContainer.append(todoContainer);
    });
  }

  dispatch(action, payload) {
    switch (action) {
      case actions.ADD: {
        this.todoManager.add(payload);
        break;
      }

      case actions.DELETE: {
        this.todoManager.delete(payload);
        break;
      }

      case actions.TOGGLE: {
        this.todoManager.toggle(payload);
        break;
      }

      default: {
        break;
      }
    }

    this.draw();
  }
}
