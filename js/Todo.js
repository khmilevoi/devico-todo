class Todo {
  constructor(inner) {
    this.id = idGenerator();
    this.inner = inner;
    this.completed = false; 
  }
}