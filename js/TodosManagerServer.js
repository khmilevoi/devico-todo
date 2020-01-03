class TodosManagerServer {
  constructor() {
    this.todos = [];
  }

  parseTodos(todos) {
    return todos.map(todo => new Todo(todo.inner, todo._id, todo.completed));
  }

  async getList() {
    return (this.todos = this.parseTodos(await getListQuery()));
  }

  async add(inner) {
    return (this.todos = this.parseTodos(await addQuery(inner)));
  }

  async delete(id) {
    return (this.todos = this.parseTodos(await deleteQuery(id)));
  }

  async toggle(id) {
    return (this.todos = this.parseTodos(await toggleQuery(id)));
  }

  async update(id, inner) {
    return (this.todos = this.parseTodos(await updateQuery(id, inner)));
  }

  async dispatch(action, payload) {
    switch (action) {
      case actions.TODOS.GET_LIST: {
        return await this.getList();
      }

      case actions.TODOS.ADD: {
        const todos = await this.add(payload);

        return todos.find(todo => todo.id === payload);
      }

      case actions.TODOS.DELETE: {
        const todos = await this.delete(payload);

        return todos.find(todo => todo.id === payload);
      }

      case actions.TODOS.TOGGLE: {
        const todos = await this.toggle(payload);

        return todos.find(todo => todo.id === payload);
      }

      case actions.TODOS.UPDATE: {
        const todos = await this.update(payload.id, payload.inner);

        return todos.find(todo => todo.id === payload.id);
      }

      default: {
        return {};
      }
    }
  }
}
