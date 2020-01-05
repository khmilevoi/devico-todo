class TodosManager {
  constructor() {
    this.todos = [];
  }

  getList(callback) {
    return callback(this.todos);
  }

  add(inner, callback) {
    const todo = new Todo(inner);

    this.todos.push(todo);

    return callback(todo);
  }

  delete(id, callback) {
    const index = this.todos.findIndex(todo => todo._id === id);

    return callback(this.todos.splice(index, 1));
  }

  toggle(id, callback) {
    const index = this.todos.findIndex(todo => todo._id === id);
    const currentState = this.todos[index].completed;
    this.todos[index].completed = !currentState;
    return callback(this.todos[index].completed);
  }

  update(id, inner, callback) {
    const index = this.todos.findIndex(todo => todo._id === id);
    this.todos[index].inner = inner;
    return callback(this.todos[index].inner);
  }

  dispatch(action, payload, callback) {
    switch (action) {
      case actions.TODOS.GET_LIST: {
        return this.getList(callback)
      }

      case actions.TODOS.ADD: {
        return this.add(payload, callback);
      }

      case actions.TODOS.DELETE: {
        return this.delete(payload, callback);
      }

      case actions.TODOS.TOGGLE: {
        return this.toggle(payload, callback);
      }

      case actions.TODOS.UPDATE: {
        return this.update(payload.id, payload.inner, callback);
      }

      default: {
        return null;
      }
    }
  }
}
