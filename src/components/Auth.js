import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Tabs,
  Tab,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';

import { connect } from 'dux/connect';

import { logIn, register } from 'store/actions/auth';

// const isActive = (state, type) => (state === type ? 'active' : '');

const useStyles = makeStyles({
  paper: {
    width: '100%',
    height: '100%',
    maxWidth: '500px',
    maxHeight: '300px',
    padding: '20px 15px',
  },
  tabs: {
    width: 'calc(100% + 30px)',
    margin: '-20px 0 0 -15px',
  },
  tab: {
    width: '50%',
  },
});

export const Auth = ({ error, logIn, register }) => {
  const [state, setState] = useState(0);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  return (
    <div className="auth">
      {/* <div className="auth__wrapper"> */}
      <Paper className={classes.paper}>
        <Tabs
          className={classes.tabs}
          value={state}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newState) => setState(newState)}
        >
          <Tab className={classes.tab} label="Login"></Tab>
          <Tab className={classes.tab} label="Register"></Tab>
        </Tabs>
        {/* <div className="auth__buttons">
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
        </div> */}
        <form
          className="auth__form"
          onSubmit={(event) => {
            event.preventDefault();

            if (state === 0) {
              logIn(login, password);
            } else if (state === 1) {
              register(login, password);
            }
          }}
        >
          <TextField
            label="login"
            variant="outlined"
            type="login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <TextField
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="auth__form-error">{error && error.message}</div>
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
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
          <button type="submit" className="auth__form-button auth__form-item">
            Send
          </button> */}
        </form>
      </Paper>
      {/* </div> */}
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
