class Todos {
  constructor(todoManager, todosContainer) {
    this.todoManager = todoManager;
    this.todosContainer = todosContainer;
  }

  createTodoElement(todo) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");

    if (todo.completed) {
      todoContainer.classList.add("completed");
    }

    const toggleButton = document.createElement("input");
    toggleButton.classList.add("todo-checkbox");
    toggleButton.type = "checkbox";
    toggleButton.checked = todo.completed;

    toggleButton.addEventListener("submit", event => {
      event.preventDefault();

      this.dispatch(actions.TODOS.TOGGLE, todo.id);
      toggleButton.checked = todo.completed;

      if (todo.completed) {
        todoContainer.classList.add("completed");
      } else {
        todoContainer.classList.remove("completed");
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("todo-delete");
    deleteButton.innerHTML = "delete";

    deleteButton.addEventListener("click", event => {
      event.preventDefault();

      this.dispatch(actions.TODOS.DELETE, todo.id);

      this.todosContainer.removeChild(todoContainer);
    });

    const inner = document.createElement("div");
    inner.classList.add("todo-inner");
    inner.innerHTML = todo.inner;

    inner.addEventListener("dblclick", async () => {
      event.preventDefault();

      const newInner = await this.updateTodo(inner);

      this.dispatch(actions.TODOS.UPDATE, { id: todo.id, inner: newInner });

      inner.innerHTML = todo.inner;
    });

    todoContainer.append(toggleButton, inner, deleteButton);

    return todoContainer;
  }

  async updateTodo(innerContainer) {
    return new Promise(resolve => {
      const form = document.createElement("form");
      const input = document.createElement("input");

      form.append(input);

      form.addEventListener("submit", event => {
        event.preventDefault();
        const inner = input.value;

        resolve(inner);
      });

      input.value = innerContainer.innerHTML;

      innerContainer.innerHTML = "";
      innerContainer.append(form);
    });
  }

  draw() {
    this.todoManager.todos.forEach(todo => {
      const todoElement = this.createTodoElement(todo);

      this.todosContainer.append(todoElement);
    });
  }

  dispatch(action, payload) {
    switch (action) {
      case actions.TODOS.ADD: {
        return this.todoManager.add(payload);
      }

      case actions.TODOS.DELETE: {
        return this.todoManager.delete(payload);
      }

      case actions.TODOS.TOGGLE: {
        return this.todoManager.toggle(payload);
      }

      case actions.TODOS.UPDATE: {
        return this.todoManager.update(payload.id, payload.inner);
      }

      default: {
        return;
      }
    }
  }
}
