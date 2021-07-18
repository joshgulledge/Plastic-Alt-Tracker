import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import {useSelector, useDispatch} from 'react-redux';
import { AppBar, Toolbar,
  Typography, Button } from '@material-ui/core';

  //---- Testing something out 
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// material ui component
import { makeStyles } from '@material-ui/core/styles';

  // material ui styling object
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },  // test is below here
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }));

  // test stuff here too
function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // test stuff here too
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};


function Nav() {
  // material ui
  const classes = useStyles();

  // grab the user from redux
  const user = useSelector((store) => store.user);
  // use dispatch
  const dispatch = useDispatch();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/mainPage';
    loginLinkData.text = 'Home';
  };

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Choking Plastic
        </Typography>

              {/* Nav Bar Options   */}
        {user.id && (
          <>
          <Button color='inherit'>
            <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
          </Link>
          </Button>

          <Button color='inherit'>
            <Link className='navLink' to="/myLikes">
             My Liked Products
            </Link>
          </Button>

          <Button color='inherit'>
            <Link className="navLink" to="/myHates">
             My Disliked Products
            </Link>
          </Button>

          <Button color='inherit'
            onClick={() => dispatch({ type: 'LOGOUT' })}>
            <span className="navLink">Log Out</span>
          </Button>
          </>
        )}

      {/* Nav Bar Conditional option -only for admin */}
        {user.authority === 'ADMIN' && (
          <Button color='inherit'>
            <Link className="navLink" to="/addProduct">
              Add Product
            </Link>
          </Button>
        )}
        
      </Toolbar>
    </AppBar>
  </div>
  );
}

// export default TemporaryDrawer;
export default Nav;

