import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { readLocalStorage } from 'store/actions/localStorage';

import Header from './Header';
import Auth from './Auth';
import { Todos } from './Todos/index';

import AddTodo from './AddTodo';

export const App = ({ online, readLocalStorage }) => {
  useEffect(() => {
    readLocalStorage();
  }, []);

  return online ? (
    <div className="content">
      <Header></Header>
      <Todos></Todos>
      <AddTodo></AddTodo>
    </div>
  ) : (
    <Auth></Auth>
  );
};

App.propTypes = {
  online: PropTypes.bool.isRequired,
  readLocalStorage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  online: !!state.auth.user,
});

const mapDispatchToProps = {
  readLocalStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
