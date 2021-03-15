import React from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


function MainPage() {
  const history = useHistory();
  
  const user = useSelector((store) => store.user);

  const imageClick = function () {
    console.log('image was clicked');
    history.push('/description')
  }; // end imageClick

  return (
    <div className="container">
      <h2>This page will show a list of products</h2>
      <div>
        <img src='https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80' width='25%' alt='random image' onClick={imageClick}/>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MainPage;
