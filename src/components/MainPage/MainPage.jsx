import React from 'react';
import {useSelector} from 'react-redux';

function MainPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>This page will show a list of products</h2>
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MainPage;
