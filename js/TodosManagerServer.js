class TodosManagerServer {
  constructor(webService) {
    this.todos = [];

    this.ws = webService;
  }

  static parseTodos(todos = []) {
    return todos.map((todo) => new Todo(todo.inner, todo._id, todo.completed));
  }

  async getList(callback) {
    const list = await this.ws.getList();

    this.todos = TodosManagerServer.parseTodos(list);

    return callback(this.todos);
  }

  async add(inner, callback) {
    const response = await this.ws.add(inner);

    const todo = new Todo(response.inner, response._id, response.completed);
    this.todos.push(todo);
    return callback(todo);
  }

  async delete(id, callback) {
    const response = await this.ws.delete(id);

    const index = this.todos.findIndex((todo) => todo._id === response._id);
    return callback(this.todos.splice(index, 1));
  }

  async toggle(id, callback) {
    await this.ws.toggle(id);

    const index = this.todos.findIndex((todo) => todo._id === id);
    const currentState = this.todos[index].completed;
    this.todos[index].completed = !currentState;
    return callback(this.todos[index].completed);
  }

  async update(id, inner, callback) {
    await this.ws.update(id, inner);

    const index = this.todos.findIndex((todo) => todo._id === id);
    this.todos[index].inner = inner;
    return callback(this.todos[index].inner);
  }

  async dispatch(action, payload, callback) {
    switch (action) {
      case actions.TODOS.GET_LIST: {
        return this.getList(callback);
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
