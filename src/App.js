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
    const header = this.createComponent(Header);
    const todos = this.createComponent(Todos);
    const auth = this.createComponent(Auth);

    const root = createElement('div', { id: 'root' }, [header, todos, auth]);

    return root;
  }
}
