import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { add } from 'store/actions/todo';
import { connect } from 'dux/connect';

export const AddTodo = ({
  add, token, active, userId,
}) => {
  const [inner, setInner] = useState('');

  const input = useRef(null);

  useEffect(() => {
    if (active && input) {
      input.current.focus();
    }
  }, [active]);

  return (
    <div className="add-todo">
      <form
        className="add-todo__wrapper"
        onSubmit={(event) => {
          event.preventDefault();

          if (active && inner.trim() !== '') {
            add(active.id, inner, token);
            setInner('');
          }
        }}
      >
        <input
          type="text"
          className="add-todo__input"
          placeholder="type text..."
          value={inner}
          ref={input}
          onChange={(event) => setInner(event.target.value)}
          disabled={!active || (userId !== active.creator && !active.isPublic)}
        />
        <button type="submit" className="add-todo__button">
          +
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  add: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
};

AddTodo.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
  token: state.auth.user.token,
  active: state.lists.active,
});

const mapDispatchToProps = {
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
