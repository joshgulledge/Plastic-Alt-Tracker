import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// material ui components
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputs: {
    margin: theme.spacing(1),
    width: '25ch',
  },
}));

function LoginForm() {
  // matierial ui
  const classes = useStyles();

  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (password && email) {
      dispatch({
        type: 'LOGIN',
        payload: {
          // username: username,
          password: password,
          email: email
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <div className={classes.inputs}>
        {/* <label htmlFor="email">
          Username: */}
          <TextField label='User Email'
            type="email"
            // name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant='filled'
          />
        {/* </label> */}
      </div>

      <div className={classes.inputs}>
        {/* <label htmlFor="password">
          Password: */}
          <TextField label='Password'
            type="password"
            // name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant='filled'
          />
        {/* </label> */}
      </div>
      <div>
        <Button variant='contained' color='primary' className="btn" type="submit" name="submit" >Log In</Button>
      </div>
    </form>
  );
}

export default LoginForm;
