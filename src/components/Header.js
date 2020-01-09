import { Component, createElement } from 'shared/Component';

export class Header extends Component {
  render() {
    const header = createElement('header', { class: 'header' });

    return header;
  }
}
