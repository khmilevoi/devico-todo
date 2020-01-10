import { Component, createElement } from 'shared/Component';

import { Header } from 'components/Header';
import { Todos } from 'components/Todos';
import { Auth } from 'components/Auth';

import { readLocalStorage } from 'store/actions/localStorage';

export class App extends Component {
  mounted() {
    this.dispatch(readLocalStorage());
  }

  render() {
    const auth = this.createComponent(Auth);

    const header = this.createComponent(Header);
    const todos = this.createComponent(Todos);

    const content = createElement('div', { class: 'content' }, [header, todos]);

    const root = createElement('div', { id: 'root' }, [auth, content]);

    return root;
  }
}
