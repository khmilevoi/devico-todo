const idGenerator = (() => {
  let currentId = 0;

  return () => currentId++;
})();

class TodoManager {
  constructor() {
    this.todos = [{inner: "asdasdas", completed: false, id: -1}];
  }

  add(inner) {
    const id = idGenerator();

    const todo = {
      inner,
      id,
      completed: false
    };

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
}
