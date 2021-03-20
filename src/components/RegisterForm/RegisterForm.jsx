import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material ui components
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputs: {
    margin: theme.spacing(1),
    width: '25ch',
  },
}));


function RegisterForm() {
  // matierial ui
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className={classes.inputs}>
        {/* <label htmlFor="username">
          Username: */}
          <TextField label='UserName'
            type="text"
            // name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            variant='filled'
          />
        {/* </label> */}
      </div>
      <div className={classes.inputs}>
        <Button variant='contained' color='primary' type="submit" name="submit">Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
