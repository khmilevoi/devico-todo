class TodosManager {
  constructor() {
    this.todos = [];

    this.todos.push(new Todo('123'));
  }

  add(inner) {
    const todo = new Todo(inner);

    this.todos.push(todo);

    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    return this.todos.splice(index, 1);
  }

  toggle(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const currentState = this.todos[index].completed;
    this.todos[index].completed = !currentState;
    return this.todos[index].completed;
  }

  update(id, inner) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos[index].inner = inner;
    return this.todos[index].inner;
  }

  dispatch(action, payload) {
    switch (action) {
      case actions.TODOS.ADD: {
        return this.add(payload);
      }

      case actions.TODOS.DELETE: {
        return this.delete(payload);
      }

      case actions.TODOS.TOGGLE: {
        return this.toggle(payload);
      }

      case actions.TODOS.UPDATE: {
        return this.update(payload.id, payload.inner);
      }

      default: {
        return null;
      }
    }
  }
}
