import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  text: {
    wordBreak: 'break-word',
  },
});

export const Todo = ({
  item, token, del, toggle, update,
}) => {
  const [state, setState] = useState(false);
  const inner = useRef(null);

  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          checked={item.completed}
          onChange={(event) => {
            event.preventDefault();

            const { id } = item;

            toggle(id, token);
          }}
          color="primary"
        />
      </ListItemIcon>
      <ListItemText
        className={classes.text}
        primary={item.inner}
        ref={inner}
        contentEditable={state}
        suppressContentEditableWarning={true}
        onDoubleClick={(event) => {
          event.preventDefault();
          setState(true);
        }}
        onKeyDown={(event) => {
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
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={(event) => {
            event.preventDefault();

            const { id } = item;

            del(id, token);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
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
};
