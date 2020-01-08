export class Todo {
  constructor(inner, id, completed = false) {
    this.id = id;
    this.inner = inner;
    this.completed = completed;
  }
}
