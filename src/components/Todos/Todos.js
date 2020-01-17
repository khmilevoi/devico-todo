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
  userId,
  token,
  toggle,
  del,
  update,
  active,
}) => {
  useEffect(() => {
    if (active && !list) {
      getTodos(active.id, token);
    }
  }, [token, active.id]);

  return (
    <div className="todos">
      {list
        && list.map((item) => (
          <Todo
            key={item.id}
            item={item}
            disabled={active.creator !== userId && !active.isPublic}
            {...{
              toggle,
              del,
              update,
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
  active: PropTypes.shape({
    id: PropTypes.string,
    creator: PropTypes.string,
    isPublic: PropTypes.bool,
  }).isRequired,
  getTodos: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.todos.list[state.lists.active && state.lists.active.id],
  active: state.lists.active || {},
  userId: state.auth.user.id,
  token: state.auth.user.token,
});

const mapDispatchToProps = {
  getTodos,
  toggle,
  del,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
