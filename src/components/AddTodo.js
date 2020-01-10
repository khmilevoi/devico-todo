import { Component, createElement } from 'shared/Component';

import { add } from 'store/actions/todo';

export class AddTodo extends Component {
  render() {
    const input = createElement('input', {
      class: 'add-todo__input',
      placeholder: 'type text...',
    });
    const button = createElement('button', { class: 'add-todo__button' }, [
      '+',
    ]);

    const wrapper = createElement('form', { class: 'add-todo__wrapper' }, [
      input,
      button,
    ]);

    const addTodo = createElement('div', { class: 'add-todo' }, [wrapper]);

    // listeners

    wrapper.addEventListener('submit', (event) => {
      event.preventDefault();

      const { id, token } = this.getState().auth.user;
      const inner = input.value;

      if (inner.trim().length !== 0) {
        this.dispatch(add(inner, id, token));

        input.value = '';
      }
    });

    // subscriptions

    return addTodo;
  }
}
