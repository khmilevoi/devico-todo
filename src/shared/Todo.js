export class Todo {
  constructor(inner, id, list, next, completed = false) {
    this.id = id;
    this.inner = inner;
    this.list = list;
    this.next = next;
    this.completed = completed;
  }
}
