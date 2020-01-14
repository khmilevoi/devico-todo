import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Paper, makeStyles, Tabs, Tab, TextField,
} from '@material-ui/core';

import { connect } from 'dux/connect';

import { logIn, register } from 'store/actions/auth';

const isActive = (state, type) => (state === type ? 'active' : '');

const useStyles = makeStyles({
  paper: {
    minWidth: '500px',
    minHeight: '300px',
  },
  tabs: {
    width: '100%',
  },
  tab: {
    width: '50%',
  },
});

export const Auth = ({ error, logIn, register }) => {
  const [state, setState] = useState('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  return (
    <div className="auth">
      <Paper className={classes.paper}>
        <Tabs
          className={classes.tabs}
          value={state === 'login' ? 0 : 1}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            className={classes.tab}
            label="Login"
            onClick={() => setState('login')}
          ></Tab>
          <Tab
            className={classes.tab}
            label="Register"
            onClick={() => setState('register')}
          ></Tab>
        </Tabs>

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
          <TextField label="login" variant="outlined" type="login"></TextField>
          <TextField label="password" variant="outlined" type="password"></TextField>
          {/* <input
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
          </button> */}
        </form>
      </Paper>
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
