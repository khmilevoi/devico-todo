import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';

import { DeleteIcon, DotsIcon } from 'shared/icons';

export const Todo = ({
  item,
  token,
  del,
  toggle,
  update,
  disabled,
  index,
  move,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'todo',
    hover: (current, monitor) => {
      if (disabled) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const currentItem = current;

      const dragIndex = currentItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY > hoverBoundingRect.height) {
        return;
      }

      move(current.id, item.id, token);

      currentItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'todo', index, id: item.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const [state, setState] = useState(false);
  const inner = useRef(null);

  drag(drop(ref));

  return (
    <div className={`todo ${isDragging ? 'dragged' : ''}`} ref={preview}>
      <div className="todo__drag" ref={ref}>
        <DotsIcon></DotsIcon>
      </div>
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
              inner.current.innerText = item.inner;
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
  index: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
