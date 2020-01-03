class Todos {
  constructor(todoManager, todosContainer) {
    this.todoManager = todoManager;
    this.todosContainer = todosContainer;
  }

  createTodoElement(todo) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo');

    if (todo.completed) {
      todoContainer.classList.add('completed');
    }

    const toggleButton = document.createElement('input');
    toggleButton.classList.add('todo-checkbox');
    toggleButton.type = 'checkbox';
    toggleButton.checked = todo.completed;

    toggleButton.addEventListener('click', async event => {
      event.preventDefault();

      this.todoManager.dispatch(actions.TODOS.TOGGLE, todo.id);
      toggleButton.checked = todo.completed;

      if (todo.completed) {
        todoContainer.classList.add('completed');
      } else {
        todoContainer.classList.remove('completed');
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('todo-delete');
    deleteButton.innerHTML = 'delete';

    deleteButton.addEventListener('click', async event => {
      event.preventDefault();

      this.todoManager.dispatch(actions.TODOS.DELETE, todo.id);

      this.todosContainer.removeChild(todoContainer);
    });

    const inner = document.createElement('div');
    inner.classList.add('todo-inner');
    inner.innerHTML = todo.inner;

    inner.addEventListener('dblclick', async event => {
      event.preventDefault();

      const newInner = await this.updateTodo(inner);

      this.todoManager.dispatch(actions.TODOS.UPDATE, {
        id: todo.id,
        inner: newInner
      });

      inner.innerHTML = todo.inner;
    });

    todoContainer.append(toggleButton, inner, deleteButton);

    return todoContainer;
  }

  async updateTodo(innerContainer) {
    return new Promise(resolve => {
      const form = document.createElement('form');
      const input = document.createElement('input');

      form.append(input);

      form.addEventListener('submit', event => {
        event.preventDefault();
        const inner = input.value;

        resolve(inner);
      });

      input.value = innerContainer.innerHTML;

      innerContainer.innerHTML = '';
      innerContainer.append(form);
    });
  }

  async draw() {
    this.todoManager.todos.forEach(todo => {
      const todoElement = this.createTodoElement(todo);

      this.todosContainer.append(todoElement);
    });
  }
}
