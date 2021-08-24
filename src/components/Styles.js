import React from "react";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  timer: {
    color: '#cca8ed',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  elixir: {
    color: '#cca8ed',
    fontFamily: 'sans-serif',
    fontSize: 100,
    marginTop: '25%'
  },
  status: {
    color: '#b36ff2', //
    boxShadow: 10

  },
  statusText: {
    fontFamily: 'sans-serif',
    fontSize: 22,
    color: '#cca8ed',
    "&:disabled": {
      color: '#b36ff2'
    }
  },
  button: {
    color: '#7102d9',
    "&:hover": {
      backgroundColor: '#c08bcc',
      color: '#9105e3',


    }
  },
  circle: {
    color: '#7102d9', //#9105e3
    justify: 'center',
    alignItems: 'center',
    marginTop: '25%',
    elevation: 10
  },
  status: {
    backgroundColor: '#121212',
    fontSize: '20px',
    color: '#39d7fa',
    fontFamily: 'sans-serif',
    "&:hover": {
      cursor: 'default'
    },
    '&:disabled': {
      color: '#5e6769'
    }
  },
  drawer: {
    width: `${2/12*100}%`,
    // flexShrink: 1,
  },
  drawerPaper: {
    width: `${1/7*100}%`,
    // background: "#242424",
    alignItems: 'center',
    boxShadow: 10,
    // marginTop: '5%',
    "&.MuiPaper-root": {
      backgroundColor: "#242424"
    }
  },
  drawerText: {
    color: "#39d7fa",
  },
  card: {
    height: '13%',
    display: 'flex',
    // background: '#121212',
    marginBottom: 12,
    "&.MuiPaper-root": {
      backgroundColor: "#242424"
    }
  },
  cardTitle: {
    fontSize: 16,
    color: '#258b8f'
  },
  cardBody: {
    fontSize: 24,
    color: '#75b7bd'
  },
  cardSub: {
    color: '#6e7ab5',
    fontSize: 14,
  }
})
