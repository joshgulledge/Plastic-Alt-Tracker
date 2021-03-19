import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/mainPage';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Plastic Alt Tracker</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/myLikes">
             My Liked Products
            </Link>

            <Link className="navLink" to="/myHates">
             My Hated Products
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {user.authority === 'ADMIN' && (
          <Link className="navLink" to="/addProduct">
            Add Product
          </Link>
        )}

      </div>
    </div>
  );
}

export default Nav;
