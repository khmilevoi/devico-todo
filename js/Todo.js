class Todo {
  constructor(inner, id = idGenerator(), completed = false) {
    this.id = id;
    this.inner = inner;
    this.completed = completed;
  }
}
