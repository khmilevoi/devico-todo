import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { deleteUser } from 'store/actions/auth';

export const Header = ({ login, deleteUser }) => (
  <div className="header">
    <div className="header__inner">
      <button className="header__inner-logout" onClick={deleteUser}>
        logout
      </button>
      <div className="header__inner-login">{login}</div>
    </div>
  </div>
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
