import { Component, createElement } from 'shared/Component';

import { Auth } from 'components/Auth';
import { Header } from 'components/Header';
import { Todos } from 'components/Todos/index';

import { readLocalStorage } from 'store/actions/localStorage';
import { auth } from 'constants/actionTypes';

export class App extends Component {
  mounted() {
    this.dispatch(readLocalStorage());
  }

  render() {
    const authComponent = this.createComponent(Auth);

    const header = this.createComponent(Header);
    const todos = this.createComponent(Todos);

    const content = createElement('div', { class: 'content' }, [header, todos]);

    const root = createElement('div', { id: 'root' }, [authComponent, content]);

    // listeners

    // subscribes

    this.subscribe(({ type }) => {
      switch (type) {
        case auth.USER.SET: {
          authComponent.classList.add('disable');
          content.classList.remove('disable');

          break;
        }

        case auth.USER.DELETE: {
          authComponent.classList.remove('disable');
          content.classList.add('disable');

          break;
        }

        default:
          break;
      }
    });

    return root;
  }
}
