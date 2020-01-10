import { Component, createElement } from 'shared/Component';

import { auth } from 'constants/actionTypes';
import { deleteUser } from 'store/actions/auth';

export class Header extends Component {
  render() {
    const logoutButton = createElement('button', { class: 'header__inner-logout' }, [
      'logout',
    ]);

    const loginContainer = createElement('div', {
      class: 'header__inner-login',
    });

    const inner = createElement('div', { class: 'header__inner' }, [
      logoutButton,
      loginContainer,
    ]);

    const header = createElement('header', { class: 'header' }, [inner]);

    // listeners

    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();

      this.dispatch(deleteUser());
    });

    // subscriptions

    this.subscribe(({ type, payload }) => {
      switch (type) {
        case auth.USER.SET: {
          loginContainer.innerHTML = payload.login;
          break;
        }

        case auth.USER.DELETE: {
          loginContainer.innerHTML = '';
          break;
        }

        default:
          break;
      }
    });

    return header;
  }
}
