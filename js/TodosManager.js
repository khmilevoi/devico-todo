class TodosManager {
  constructor() {
    this.todos = [];

    this.todos.push(new Todo("123"))
  }

  add(inner) {
    const todo = new Todo(inner);

    this.todos.push(todo);

    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex(todo => todo.id === id);

    return this.todos.splice(index, 1);
  }

  toggle(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    const currentState = this.todos[index].completed;

    return (this.todos[index].completed = !currentState);
  }

  update(id, inner) {
    const index = this.todos.findIndex(todo => todo.id === id);

    return (this.todos[index].inner = inner);
  }
}
