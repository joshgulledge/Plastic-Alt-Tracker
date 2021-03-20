import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import RegisterForm from '../RegisterForm/RegisterForm';

// material ui components
import Button from '@material-ui/core/Button';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">

      <div className="grid">
        
        <div className="grid-col grid-col_4" >
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <Button variant="contained" color="primary" className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
          <div className='landing_page_about'>
            <h3>What we Do</h3>
            <p>We aim to try and help people cut back on their personal plastic use. We think this can be done by keeping up with different products that we have used, ones we haven't used yet, and if we liked those products and why. This application will help users do that. We have a wide range of products that you can browse through and like or dislike the products as well as give a reason why that product either worked or didn't work for you.  </p>
          </div>
      </div>
    </div>
  );
}

export default LandingPage;
