import React, { useEffect, useState } from 'react';
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
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (active.id && !list) {
      getTodos(active.id, token);
    }

    setFlag(true);
  }, [token, active.id, list && list.length]);

  const orderedList = [];

  if (list && active) {
    const findById = (id) => list.find((item) => item.id === id);

    let current = findById(active.head);

    for (let i = 0; i < list.length; ++i) {
      if (current) {
        orderedList.push(current);

        current = findById(current.next);
      }
    }
  }

  return (
    <div
      className="todos"
      onScroll={(event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        const scrollBottom = scrollHeight - clientHeight - scrollTop;

        if (scrollBottom < 50) {
          const last = orderedList[orderedList.length - 1];

          if (last && last.next && flag) {
            if (active.id) {
              getTodos(active.id, token, last.id);

              setFlag(false);
            }
          }
        }
      }}
    >
      {orderedList.map((item, index) => (
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
    head: PropTypes.number,
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
