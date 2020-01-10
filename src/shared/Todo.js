export class Todo {
  constructor(inner, id, owner, completed = false) {
    this.id = id;
    this.inner = inner;
    this.owner = owner;
    this.completed = completed;
  }
}
