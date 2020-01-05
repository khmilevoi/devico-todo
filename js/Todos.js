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

    toggleButton.addEventListener("change", async event => {
      event.preventDefault();

      this.todoManager.dispatch(actions.TODOS.TOGGLE, todo._id, state => {
        toggleButton.checked = state;

        if (state) {
          todoContainer.classList.add("completed");
        } else {
          todoContainer.classList.remove("completed");
        }
      });
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("todo-delete");
    deleteButton.innerHTML = "delete";

    deleteButton.addEventListener("click", async event => {
      event.preventDefault();

      this.todoManager.dispatch(actions.TODOS.DELETE, todo._id, () => {
        this.todosContainer.removeChild(todoContainer);
      });
    });

    const inner = document.createElement("div");
    inner.classList.add("todo-inner");
    inner.innerHTML = todo.inner;
    let flag = true;

    inner.addEventListener("dblclick", async event => {
      event.preventDefault();

      if (flag) {
        flag = false;

        const newInner = await this.updateTodo(inner);

        this.todoManager.dispatch(
          actions.TODOS.UPDATE,
          {
            id: todo._id,
            inner: newInner
          },
          newInner => {
            inner.innerHTML = newInner;
          }
        );

        flag = true;
      }
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
      input.focus();
    });
  }

  draw() {
    this.todoManager.dispatch(actions.TODOS.GET_LIST, null, todos => {
      todos.forEach(todo => {
        const todoElement = this.createTodoElement(todo);

        this.todosContainer.append(todoElement);
      });
    });
  }
}
