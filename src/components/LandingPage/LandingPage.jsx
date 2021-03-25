import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import RegisterForm from '../RegisterForm/RegisterForm';

// material ui components
import { Button, Typography, Grid } from '@material-ui/core';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <Grid container 
          justify='center'
          alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h3' align='center'>
                What we Do
              </Typography>
            </Grid>
           
            <Grid item xs={12}>
              <Typography variant='body1' align='center'>
                We aim to try and help people cut back on their personal plastic use. We think this can be done by keeping up with different products that we have used, ones we haven't used yet, and if we liked those products and why. This application will help users do that. We have a wide range of products that you can browse through and like or dislike the products as well as give a reason why that product either worked or didn't work for you.  
              </Typography>
            </Grid>
            
          </Grid>

      <Grid 
        container 
        justify='center' 
        alignItems='center'
        className="grid">
        
        <Grid item xs={12} >
          <RegisterForm />
          <center>
            <Typography variant='h4'>
              Already a Member?
            </Typography>
            <Button variant="contained" color="primary" className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </Grid>
          
      </Grid>
    </div>
  );
}

export default LandingPage;
