import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { readLocalStorage } from 'store/actions/localStorage';

import { Lists } from 'components/Lists';
import { deleteActive } from 'store/actions/list';
import Header from './components/Header';
import Auth from './components/Auth';
import { Todos } from './components/Todos';
import AddTodo from './components/AddTodo';

export const App = ({ online, readLocalStorage, deleteActive }) => {
  useEffect(() => {
    readLocalStorage();

    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        deleteActive();
      }
    });
  }, []);

  return online ? (
    <div className="content">
      <Header></Header>
      <div className="content__inner">
        <Lists></Lists>

        <div className="content__todos">
          <Todos></Todos>
          <AddTodo></AddTodo>
        </div>
      </div>
    </div>
  ) : (
    <Auth></Auth>
  );
};

App.propTypes = {
  online: PropTypes.bool.isRequired,
  readLocalStorage: PropTypes.func.isRequired,
  deleteActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  online: !!state.auth.user,
});

const mapDispatchToProps = {
  readLocalStorage,
  deleteActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
