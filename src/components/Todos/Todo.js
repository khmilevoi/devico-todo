import { Component, createElement } from 'shared/Component';

export class Todo extends Component {
  constructor(store, item) {
    super(store);

    this.item = item;
  }

  render() {
    const todo = createElement('div', { class: 'todo' });

    // listeners

    // subscriptions

    return todo;
  }
}
