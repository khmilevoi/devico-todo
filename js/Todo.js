class Todo {
  constructor(inner, id = idGenerator(), completed = false) {
    this._id = id;
    this.inner = inner;
    this.completed = completed;
  }
}
