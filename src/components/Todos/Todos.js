import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import {
  getList, toggle, del, update,
} from 'store/actions/todo';

import { Todo } from './Todo';

export const Todos = ({
  getList, list, owner, token, toggle, del, update,
}) => {
  useEffect(() => {
    getList(owner, token);
  }, [token]);

  return (
    <div className="todos">
      {list.map((item) => (
        <Todo
          key={item.id}
          item={item}
          {...{
            toggle,
            del,
            update,
            owner,
            token,
          }}
        ></Todo>
      ))}
    </div>
  );
};

Todos.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getList: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.todos.list,
  owner: state.auth.user.id,
  token: state.auth.user.token,
});

const mapDispatchToProps = {
  getList,
  toggle,
  del,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
