import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import {
  getTodos, toggle, del, update,
} from 'store/actions/todo';

import { Todo } from './Todo';

export const Todos = ({
  getTodos,
  list,
  owner,
  token,
  toggle,
  del,
  update,
  active,
}) => {
  useEffect(() => {
    if (active && !list) {
      getTodos(active, token);
    }
  }, [token, active]);

  return (
    <div className="todos">
      {list
        && list.map((item) => (
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
  ),
  active: PropTypes.string,
  getTodos: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.todos.list[state.lists.active],
  active: state.lists.active,
  owner: state.auth.user.id,
  token: state.auth.user.token,
});

const mapDispatchToProps = {
  getTodos,
  toggle,
  del,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
