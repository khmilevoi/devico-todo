import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { List, makeStyles } from '@material-ui/core';

import { connect } from 'dux/connect';

import {
  getList, toggle, del, update,
} from 'store/actions/todo';

import { Todo } from './Todo';

const useStyles = makeStyles({
  list: {
    width: '100%',
    height: 'calc(100% - 100px)',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
});

export const Todos = ({
  getList, list, owner, token, toggle, del, update,
}) => {
  useEffect(() => {
    getList(owner, token);
  }, [token]);

  const classes = useStyles();

  return (
    <List className={classes.list}>
      {list.map((item) => (
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
    </List>
  );
};

Todos.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getList: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.todos.list,
  owner: state.auth.user.id,
  token: state.auth.user.token,
});

const mapDispatchToProps = {
  getList,
  toggle,
  del,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
