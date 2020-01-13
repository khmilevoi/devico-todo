import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { logIn, register } from 'store/actions/auth';

const isActive = (state, type) => (state === type ? 'active' : '');

export const Auth = ({ error, logIn, register }) => {
  const [state, setState] = useState('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <div className="auth__buttons">
          <button
            className={`auth__buttons-button ${isActive(state, 'login')}`}
            onClick={() => setState('login')}
          >
            Login
          </button>
          <button
            className={`auth__buttons-button ${isActive(state, 'register')}`}
            onClick={() => setState('register')}
          >
            Register
          </button>
        </div>
        <form
          className="auth__form"
          onSubmit={(event) => {
            event.preventDefault();

            if (state === 'login') {
              logIn(login, password);
            } else if (state === 'register') {
              register(login, password);
            }
          }}
        >
          <input
            type="login"
            className="auth__form-input auth__form-item"
            placeholder="login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <input
            type="password"
            className="auth__form-input auth__form-item"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="auth__form-error">{error && error.message}</div>
          <button type="submit" className="auth__form-button auth__form-item">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

Auth.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  logIn: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  logIn,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
