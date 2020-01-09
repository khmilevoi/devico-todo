import { Component } from 'shared/Component';

import { Header } from 'components/Header';
import { Todos } from 'components/Todos';
import { Auth } from 'components/Auth';

import { readLocalStorage } from 'store/actions/localStorage';

export class App extends Component {
  init() {
    this.dispatch(readLocalStorage());
  }

  render() {
    this.createComponent('header', Header);

    this.createComponent('todos', Todos);

    this.createComponent('auth', Auth);
  }
}
