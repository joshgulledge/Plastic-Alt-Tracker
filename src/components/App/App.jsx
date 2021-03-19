import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// components
import MainPage from '../MainPage/MainPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import DescriptionPage from '../DescriptionPage/DescriptionPage'
import UserLikes from '../UserLikes/UserLikes';
import UserHates from '../UserHates/UserHates';
import AddProduct from '../AddProduct/AddProduct';
// styling
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    
    <Router>
      
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/mainPage will show the MainPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the mainPage is always on localhost:3000/mainPage */}
          <ProtectedRoute
            exact
            path="/mainPage">
            <MainPage />
          </ProtectedRoute>


          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/mainPage"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/mainPage">
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/registration"
            authRedirect="/mainPage">
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/home"
            authRedirect="/mainPage">
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute
           exact path='/description'>
            <DescriptionPage />
          </ProtectedRoute>

          <ProtectedRoute 
          exact path='/myLikes'>
            <UserLikes />
          </ProtectedRoute>

          <ProtectedRoute 
          exact path='/myHates'>
            <UserHates />
          </ProtectedRoute>

          <ProtectedRoute 
          exact path='/addProduct'>
            <AddProduct />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
