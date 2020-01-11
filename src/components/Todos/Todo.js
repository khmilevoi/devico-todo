import { Component, createElement } from 'shared/Component';
import { toggle, del, update } from 'store/actions/todo';
import { todos } from 'constants/actionTypes';

export class Todo extends Component {
  constructor(store, item) {
    super(store);

    this.item = item;
  }

  render() {
    const label = createElement(
      'label',
      {
        class: 'todo__checkbox-label',
        for: this.item.id,
      },
      ['L'],
    );
    const checkbox = createElement('input', {
      class: 'todo__checkbox-input',
      type: 'checkbox',
      id: this.item.id,
    });

    checkbox.checked = this.item.completed;

    const checkboxWrapper = createElement(
      'div',
      {
        class: 'todo__checkbox-wrapper',
      },
      [checkbox, label],
    );

    const inner = createElement('div', { class: 'todo__inner-text' }, [
      this.item.inner,
    ]);

    const innerWrapper = createElement(
      'div',
      { class: 'todo__inner-wrapper' },
      [inner],
    );

    const deleteButton = createElement(
      'button',
      { class: 'todo__delete-button' },
      ['delete'],
    );

    const deleteButtonWrapper = createElement(
      'div',
      { class: 'todo__delete-wrapper' },
      [deleteButton],
    );

    const todoElement = createElement('div', { class: 'todo' }, [
      checkboxWrapper,
      innerWrapper,
      deleteButtonWrapper,
    ]);

    // listeners

    checkbox.addEventListener('click', (event) => {
      event.preventDefault();

      const { id } = this.item;
      const { token } = this.getState().auth.user;

      this.dispatch(toggle(id, token));
    });

    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();

      const { id } = this.item;
      const { token } = this.getState().auth.user;

      this.dispatch(del(id, token));
    });

    inner.addEventListener('dblclick', (event) => {
      event.preventDefault();

      inner.contentEditable = true;
      inner.focus();
    });

    inner.addEventListener('keydown', (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();

        const { id } = this.item;
        const { token } = this.getState().auth.user;
        const text = inner.innerText.trim();

        this.dispatch(update(id, text, token));

        inner.contentEditable = false;
      } else if (event.keyCode === 27) {
        inner.innerText = this.item.inner;

        inner.contentEditable = false;
      }
    });

    // subscriptions

    this.subscribe(({ type, payload }) => {
      switch (type) {
        case todos.LIST.TOGGLE: {
          if (this.item.id === payload) {
            checkbox.checked = !checkbox.checked;
          }

          break;
        }

        case todos.LIST.DELETE: {
          if (this.item.id === payload) {
            todoElement.remove();
          }

          break;
        }

        case todos.LIST.UPDATE: {
          if (this.item.id === payload.id) {
            inner.innerText = payload.inner;
            this.item.inner = payload.inner;
          }

          break;
        }

        default:
          break;
      }
    });

    return todoElement;
  }
}
