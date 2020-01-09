import { Component, createElement } from 'shared/Component';

export class Todos extends Component {
  render() {
    const todos = createElement('div', { class: 'todos' });

    return todos;
  }
}
