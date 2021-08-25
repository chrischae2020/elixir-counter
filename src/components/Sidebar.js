import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useStyles } from './Styles';
import Home from './Home';
import Divider from '@material-ui/core/Divider'



export default function Sidebar() {

  const classes = useStyles()

  return (
      <Drawer variant='permanent' anchor='left' className={classes.drawer} 
              classes={{ paper: classes.drawerPaper, }}>
        <List>
          <ListItem button key='Home'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <ListItemText primary='Home' className={classes.drawerText} />
            </Link>
          </ListItem>
          <ListItem button key='Instructions'>
            <Link to='/instructions' style={{ textDecoration: 'none' }}>
              <ListItemText primary='Instructions' className={classes.drawerText} />
            </Link>
          </ListItem>
          {/* <ListItem button key='Elixir Counter'>
            <Link to='/elixir-counter' style={{ textDecoration: 'none' }}>
              <ListItemText primary='Elixir Counter' className={classes.drawerText} />
            </Link>
          </ListItem> */}
          {/* <Divider />
          <ListItem button key='Change Logs'>
            <Link to ='/change-logs' style={{ textDecoration: 'none' }}>
              <ListItemText primary='Change Logs' className={classes.drawerText}/>
            </Link>
          </ListItem> */}
        </List>
      </Drawer>
  );
}