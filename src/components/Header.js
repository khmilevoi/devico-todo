import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { logout } from 'store/actions/auth';

export const Header = ({ login, logout }) => (
  <div className="header">
    <div className="header__inner">
      <button className="header__inner-logout" onClick={logout}>
        logout
      </button>
      <div className="header__inner-login">{login}</div>
    </div>
  </div>
);

Header.propTypes = {
  login: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.auth.user.login,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
