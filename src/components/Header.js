import { Component, createElement } from 'shared/Component';

import { auth } from 'constants/actionTypes';

export class Header extends Component {
  render() {
    const loginContainer = createElement('div', {
      class: 'header__inner-login',
    });

    const inner = createElement('div', { class: 'header__inner' }, [
      loginContainer,
    ]);

    const header = createElement('header', { class: 'header' }, [inner]);

    // listeners

    // subscriptions

    this.subscribe(({ type, payload }) => {
      switch (type) {
        case auth.USER.SET: {
          return (loginContainer.innerHTML = payload.login);
        }

        case auth.USER.DELETE: {
          return (loginContainer.innerHTML = '');
        }

        default:
          return null;
      }
    });

    return header;
  }
}
