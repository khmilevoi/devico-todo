export class Todo {
  constructor(inner, id, list, completed = false) {
    this.id = id;
    this.inner = inner;
    this.list = list;
    this.completed = completed;
  }
}
