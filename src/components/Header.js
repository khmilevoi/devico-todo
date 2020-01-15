import React from 'react';
import PropTypes from 'prop-types';

import { Button, makeStyles } from '@material-ui/core';

import { connect } from 'dux/connect';

import { deleteUser } from 'store/actions/auth';

import * as s from 'styles/header';

const useStyles = makeStyles({
  button: {
    color: 'white',
  },
});

export const Header = ({ login, deleteUser }) => {
  const classes = useStyles();

  return (
    <s.Header>
      <s.Inner>
        <Button className={classes.button} size="small" onClick={deleteUser}>
          logout
        </Button>
        <s.Login>{login}</s.Login>
      </s.Inner>
    </s.Header>
  );
};

Header.propTypes = {
  login: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.auth.user.login,
});

const mapDispatchToProps = {
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
