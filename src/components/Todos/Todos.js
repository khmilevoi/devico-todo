import { Component, createElement } from 'shared/Component';

import { auth, todos } from 'constants/actionTypes';
import { getList } from 'store/actions/todo';
import { Todo } from './Todo';

export class Todos extends Component {
  createList(list) {
    return list.map((item) => this.createComponent(Todo, item));
  }

  render() {
    const todosElement = createElement('div', { class: 'todos' });

    // listeners

    // subscriptions

    this.subscribe(({ type, payload }) => {
      switch (type) {
        case auth.USER.SET: {
          const { id, token } = payload;

          this.dispatch(getList(id, token));

          break;
        }

        case todos.LIST.SET: {
          const list = this.createList(payload);

          todosElement.innerHTML = '';

          todosElement.append(...list);

          break;
        }

        case todos.LIST.ADD: {
          const item = this.createComponent(Todo, payload);

          todosElement.append(item);

          break;
        }

        default:
          break;
      }
    });

    return todosElement;
  }
}
