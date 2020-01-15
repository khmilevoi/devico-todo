import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Fab, makeStyles, TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { add } from 'store/actions/todo';
import { connect } from 'dux/connect';

import * as s from 'styles/addTodo';

const useStyles = makeStyles({
  input: {
    width: 'calc(100% - 45px)',
    height: '100%',
  },
});

export const AddTodo = ({ add, token, id }) => {
  const [inner, setInner] = useState('');

  const classes = useStyles();

  return (
    <s.AddTodo>
      <s.Form
        onSubmit={(event) => {
          event.preventDefault();

          if (inner.trim() !== '') {
            add(inner, id, token);
            setInner('');
          }
        }}
      >
        <TextField
          className={classes.input}
          color="primary"
          placeholder="type text..."
          value={inner}
          onChange={(event) => setInner(event.target.value)}
        />
        <Fab type="submit" size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </s.Form>
    </s.AddTodo>
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
