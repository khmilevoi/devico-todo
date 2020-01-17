import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { readLocalStorage } from 'store/actions/localStorage';
import { deleteActive } from 'store/actions/list';

import Header from 'components/Header';
import Auth from 'components/Auth';
import AddTodo from 'components/AddTodo';
import Share from 'components/Share';
import { Lists } from 'components/Lists';
import { Todos } from 'components/Todos';

export const App = ({
  online,
  openShare,
  readLocalStorage,
  deleteActive,
  active,
}) => {
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
      {openShare && <Share></Share>}

      <Header></Header>
      <div className="content__inner">
        <Lists></Lists>

        <div className="content__todos">
          <div className="content__todos-info">
            <div className="content__todos-name">{active && active.name}</div>
            <div className="content__todos-access">
              {active && (active.isPublic ? 'public' : 'private')}
            </div>
          </div>

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
  openShare: PropTypes.bool.isRequired,
  readLocalStorage: PropTypes.func.isRequired,
  deleteActive: PropTypes.func.isRequired,
  active: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  online: !!state.auth.user,
  openShare: !!state.share.list,
  active: state.lists.active,
});

const mapDispatchToProps = {
  readLocalStorage,
  deleteActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
