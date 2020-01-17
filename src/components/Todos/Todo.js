import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { DeleteIcon } from 'shared/icons';

export const Todo = ({
  item, token, del, toggle, update, disabled,
}) => {
  const [state, setState] = useState(false);
  const inner = useRef(null);

  return (
    <div className="todo">
      <div className="todo__checkbox-wrapper">
        <input
          type="checkbox"
          disabled={disabled}
          className="todo__checkbox-input"
          id={item.id}
          checked={item.completed}
          onChange={(event) => {
            event.preventDefault();

            const { id } = item;

            toggle(id, token);
          }}
        />
        <label htmlFor={item.id} className="todo__checkbox-label">
          L
        </label>
      </div>
      <div className="todo__inner-wrapper">
        <pre
          ref={inner}
          className="todo__inner-text"
          contentEditable={state}
          suppressContentEditableWarning={true}
          onDoubleClick={async (event) => {
            event.preventDefault();
            if (!disabled) {
              await setState(true);
              inner.current.focus();
            }
          }}
          onKeyDown={(event) => {
            event.stopPropagation();

            if (event.keyCode === 13 && !event.shiftKey) {
              event.preventDefault();
              const { id } = item;
              const text = inner.current.innerText.trim();
              update(id, text, token);
              setState(false);
            } else if (event.keyCode === 27) {
              inner.current.innerText = item.inner;
              setState(false);
            }
          }}
        >
          {item.inner}
        </pre>
      </div>
      <div className="todo__delete-wrapper">
        <button
          disabled={disabled}
          className="todo__delete-button"
          onClick={(event) => {
            event.preventDefault();

            const { id } = item;

            del(id, token);
          }}
        >
          <DeleteIcon></DeleteIcon>
        </button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    inner: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
