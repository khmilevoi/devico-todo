import { Component, createElement } from 'shared/Component';

import { auth } from 'constants/actionTypes';
import { logIn, register } from 'store/actions/auth';

export class Auth extends Component {
  init() {
    this.state = 'login';
  }

  render() {
    const loginBtn = createElement(
      'button',
      { class: 'auth__buttons-button active' },
      ['Login'],
    );
    const registerBtn = createElement(
      'button',
      { class: 'auth__buttons-button' },
      ['Register'],
    );

    const buttons = createElement('div', { class: 'auth__buttons' }, [
      loginBtn,
      registerBtn,
    ]);

    const loginInput = createElement('input', {
      class: 'auth__form-input auth__form-item',
      placeholder: 'login',
    });
    const passwordInput = createElement('input', {
      class: 'auth__form-input auth__form-item',
      placeholder: 'password',
    });
    const confirmButton = createElement(
      'button',
      {
        class: 'auth__form-button auth__form-item',
        type: 'submit',
      },
      ['Send'],
    );

    const errorContainer = createElement('div', {
      class: 'auth__form-error',
    });

    const form = createElement('form', { class: 'auth__form' }, [
      loginInput,
      passwordInput,
      errorContainer,
      confirmButton,
    ]);

    const wrapper = createElement('div', { class: 'auth__wrapper' }, [
      buttons,
      form,
    ]);

    const authElement = createElement('div', { class: 'auth' }, [wrapper]);

    // listeners

    loginBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.state = 'login';

      loginBtn.classList.add('active');
      registerBtn.classList.remove('active');
    });

    registerBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.state = 'register';

      loginBtn.classList.remove('active');
      registerBtn.classList.add('active');
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const login = loginInput.value;
      const password = passwordInput.value;

      if (this.state === 'login') {
        this.dispatch(logIn(login, password));
      } else if (this.state === 'register') {
        this.dispatch(register(login, password));
      }
    });

    // subscribes

    this.subscribe(({ type, payload }) => {
      console.log('AUTH: ', type);

      switch (type) {
        case auth.USER.SET: {
          return authElement.classList.add('disable');
        }

        case auth.USER.DELETE: {
          return authElement.classList.remove('disable');
        }

        case auth.ERROR.SET: {
          return errorContainer.innerHTML = payload.message;
        }

        case auth.ERROR.DELETE: {
          return errorContainer.innerHTML = '';
        }

        default:
          return null;
      }
    });

    return authElement;
  }
}
