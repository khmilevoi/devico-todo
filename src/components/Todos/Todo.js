import { Component, createElement } from 'shared/Component';

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
      ['+'],
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

    const todo = createElement('div', { class: 'todo' }, [
      checkboxWrapper,
      innerWrapper,
      deleteButtonWrapper,
    ]);

    // listeners

    // subscriptions

    return todo;
  }
}
