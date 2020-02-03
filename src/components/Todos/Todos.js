import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import {
  getTodos, toggle, del, update, move,
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
  move,
}) => {
  useEffect(() => {
    if (active.id && !list) {
      getTodos(active.id, token);
    }
  }, [token, active.id]);

  return (
    <div className="todos">
      {list
        && list.map((item, index) => (
          <Todo
            key={item.id}
            item={item}
            index={index}
            disabled={active.creator !== userId && !active.isPublic}
            {...{
              toggle,
              del,
              update,
              token,
              move,
            }}
          ></Todo>
        ))}
    </div>
  );
};

Todos.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  active: PropTypes.shape({
    id: PropTypes.number,
    creator: PropTypes.number,
    isPublic: PropTypes.bool,
  }).isRequired,
  getTodos: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
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
  move,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
