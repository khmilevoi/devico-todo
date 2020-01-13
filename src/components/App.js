import React, { useEffect } from 'react';

import { connect } from 'dux/connect';

// import { Component, createElement } from 'shared/Component';

import { readLocalStorage } from 'store/actions/localStorage';
// import { auth } from 'constants/actionTypes';

// import { Auth } from './Auth';
// import { Header } from './Header';
// import { Todos } from './Todos/index';

// import { AddTodo } from './AddTodo';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  readLocalStorage,
};

export const App = ({ readLocalStorage }) => {
  useEffect(() => {
    readLocalStorage();
  }, [readLocalStorage]);

  return (
    <>
      <div className="auth">auth</div>
      <div className="content">
        <div className="header">header</div>
        <div className="todos">todos</div>
        <div className="add-todo">add-todo</div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export class App extends Component {
//   mounted() {
//     this.dispatch(readLocalStorage());
//   }

//   render() {
//     const authComponent = this.createComponent(Auth);

//     const header = this.createComponent(Header);
//     const todos = this.createComponent(Todos);
//     const addTodo = this.createComponent(AddTodo);

//     const content = createElement('div', { class: 'content' }, [
//       header,
//       todos,
//       addTodo,
//     ]);

//     const root = createElement('div', { id: 'root' }, [authComponent, content]);

//     // listeners

//     // subscribes

//     this.subscribe(({ type }) => {
//       switch (type) {
//         case auth.USER.SET: {
//           authComponent.classList.add('disable');
//           content.classList.remove('disable');

//           break;
//         }

//         case auth.USER.DELETE: {
//           authComponent.classList.remove('disable');
//           content.classList.add('disable');

//           break;
//         }

//         default:
//           break;
//       }
//     });

//     return root;
//   }
// }
