import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import { connect } from 'dux/connect';

import { deleteUser } from 'store/actions/auth';

import * as s from 'styles/header';

export const Header = ({ login, deleteUser }) => (
  <s.Header>
    <s.Inner>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={deleteUser}
      >
        logout
      </Button>
      <s.Login>{login}</s.Login>
    </s.Inner>
  </s.Header>
);

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
