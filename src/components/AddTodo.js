import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { add } from 'store/actions/todo';
import { connect } from 'dux/connect';

export const AddTodo = ({ add, token, id }) => {
  const [inner, setInner] = useState('');

  return (
    <div className="add-todo">
      <form
        className="add-todo__wrapper"
        onSubmit={(event) => {
          event.preventDefault();

          if (inner.trim() !== '') {
            add(inner, id, token);
            setInner('');
          }
        }}
      >
        <input
          type="text"
          className="add-todo__input"
          placeholder="type text..."
          value={inner}
          onChange={(event) => setInner(event.target.value)}
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
  id: PropTypes.string.isRequired,
};

AddTodo.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.auth.user.id,
  token: state.auth.user.token,
});

const mapDispatchToProps = {
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
