import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useSnackbar } from 'notistack';
import './Timer.css';
import Figure from 'react-bootstrap/Figure';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RedoIcon from '@material-ui/icons/Redo';

import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Sidebar from './Sidebar';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './Styles';

function Timer() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [elixir, setElixir] = useState(6);

  const [isSingle, setIsSingle] = useState(true)
  const [isDouble, setIsDouble] = useState(false)
  const [isTriple, setIsTriple] = useState(false)

  const [isOvertime, setIsOvertime] = useState(false)

  const BEGINNING_ELIXIR = 6
  const [SINGLE_RATE, DOUBLE_RATE, TRIPLE_RATE] = [2.8, 1.4, 0.9] // 1 elixir (sec)
  const [DOUBLE_TIME, TRIPLE_TIME] = [120, 240] // seconds into game
  const OVERTIME = 180

  const [timer, setTimer] = useState("")
  const classes = useStyles()

  const arrowKeys = useCallback((event) => {
    if (event.keyCode === 32) { // space bar
      event.preventDefault()
      toggle()
    } else if ((event.keyCode === 68) || (event.keyCode === 187)) { // d +
      event.preventDefault()
      increase()
    } else if ((event.keyCode === 65) || (event.keyCode === 189)) { // a -
      event.preventDefault()
      decrease()
    } else if ((event.keyCode === 49) || (event.keyCode === 97)) {
      event.preventDefault()
      subtractElixir(1)
    } else if ((event.keyCode === 50) || (event.keyCode === 98)) {
      event.preventDefault()
      subtractElixir(2)
    } else if ((event.keyCode === 51) || (event.keyCode === 99)) {
      event.preventDefault()
      subtractElixir(3)
    } else if ((event.keyCode === 52) || (event.keyCode === 100)) {
      event.preventDefault()
      subtractElixir(4)
    } else if ((event.keyCode === 53) || (event.keyCode === 101)) {
      event.preventDefault()
      subtractElixir(5)
    } else if ((event.keyCode === 54) || (event.keyCode === 102)) {
      event.preventDefault()
      subtractElixir(6)
    } else if ((event.keyCode === 55) || (event.keyCode === 103)) {
      event.preventDefault()
      subtractElixir(7)
    } else if ((event.keyCode === 56) || (event.keyCode === 104)) {
      event.preventDefault()
      subtractElixir(8)
    } else if ((event.keyCode === 57) || (event.keyCode === 105)) {
      event.preventDefault()
      subtractElixir(9)
    } 
  }, [increase, decrease, subtractElixir, toggle]);

  function subtractElixir(amount) {
    if (isActive) {
      if (((elixir+0.1) < amount)) {
        console.log(amount + ' larger than ' + elixir + ' elixir');
        enqueueSnackbar(`Not enough elixir for ${amount} (${elixir.toFixed(1)})`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          autoHideDuration: 1500,
          TransitionComponent: Slide
        })

      } else {
        setElixir(elixir => elixir - amount)
        enqueueSnackbar(`Spent ${amount} elixir`, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          autoHideDuration: 1500,
          TransitionComponent: Slide
        })
      }
    }
  }

  function toggle() {
    setIsActive(!isActive);
  }

  function add_or_max(num, add, maxed) {
    if ((num + add) < maxed) {
      return num + add
    } else {
      return maxed
    }
  }

  function subtract_or_min(num, sub, min) {
    if ((num - sub) > min) {
      return num - sub
    } else {
      return min
    }
  }

  // increase seconds by 1
  function increase() {
    setSeconds(seconds => seconds + 1)
    if (isSingle) setElixir(elixir => add_or_max(elixir, (1 / SINGLE_RATE), 10))
    else if (isDouble) setElixir(elixir => add_or_max(elixir, (1 / DOUBLE_RATE), 10))
    else if (isTriple) setElixir(elixir => add_or_max(elixir, (1 / TRIPLE_RATE), 10))
  }

  // decrease seconds by 1
  function decrease() {
    if ((seconds) > 0) {
      console.log('TRUEEEE')
      setSeconds(seconds => seconds - 1)

      if (isSingle) setElixir(elixir => subtract_or_min(elixir, (1 / SINGLE_RATE), 0))
      else if (isDouble) setElixir(elixir => subtract_or_min(elixir, (1 / DOUBLE_RATE), 0))
      else if (isTriple) setElixir(elixir => subtract_or_min(elixir, (1 / TRIPLE_RATE), 0))
    } else reset()
    
  }

  // Resets timer
  function reset() {
    setSeconds(0);
    setIsActive(false);
    setElixir(BEGINNING_ELIXIR)
    setIsSingle(true)
    setIsDouble(false)
    setIsTriple(false)
  }

  // convert seconds left to time
  function convert_to_time() {
    var seconds_passed = 0
    var seconds_time = 0
    var minutes = 0
    if (!isOvertime) {
      seconds_passed = Math.floor(seconds)
      seconds_time = (180 - seconds_passed) % 60
      minutes = Math.floor((180 - seconds_time - seconds_passed) / 60)
      if (seconds_time < 10) setTimer(`${minutes}:${("0" + seconds_time).slice(-2)}`)
      else setTimer(`${minutes}:${seconds_time}`)
    } else {
      seconds_passed = Math.floor((seconds) - OVERTIME)
      seconds_time = (120 - seconds_passed) % 60
      minutes = Math.floor((120 - seconds_time - seconds_passed) / 60)
      if (seconds_time < 10) setTimer(`${minutes}:${("0" + seconds_time).slice(-2)}`)
      else setTimer(`${minutes}:${seconds_time}`)
    }
  }

  useEffect(() => {
    convert_to_time()
  })

  // key presses
  useEffect(() => {
    document.addEventListener("keydown", arrowKeys, false);
    // document.addEventListener("keydown", elixirKeys);
    return () => {
      document.removeEventListener("keydown", arrowKeys, false);
      // document.removeEventListener("keydown", elixirKeys);
    };
  }, [elixir, arrowKeys]);

  // ELIXIR
  useEffect(() => {
    let elixirInterval = null;
    if (isActive && (elixir < 9.9)) {
      if (isSingle) {
        elixirInterval = setInterval(() => {
          setElixir(elixir => elixir + 0.10);
        }, SINGLE_RATE * 988.88889 / 10 - 14)
      } else if (isDouble) {
        elixirInterval = setInterval(() => {
          setElixir(elixir => elixir + 0.10 - (1/14));
        }, DOUBLE_RATE * 988.88889 / 10 - 14)
      } else if (isTriple) {
        elixirInterval = setInterval(() => {
          setElixir(elixir => elixir + 0.10 - (1/14));
        }, TRIPLE_RATE * 988.88889 / 10 - 14)
      }
    } else if (!isActive) {
      clearInterval(elixirInterval);
    }
    return () => {
      clearInterval(elixirInterval);
    }
  }, [isActive, isSingle, isDouble, isTriple, elixir, DOUBLE_RATE, SINGLE_RATE, TRIPLE_RATE]);

  // TIMER
  useEffect(() => {
    let timeInterval = null;
    if (isActive) {
      timeInterval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 988.88889); // changed 

      if (!isOvertime && (seconds >= (OVERTIME))) setIsOvertime(true)

      if (isDouble && (seconds >= (TRIPLE_TIME))) {
        setIsDouble(false)
        setIsSingle(false)
        setIsTriple(true)
      } else if (isSingle && (seconds >= (DOUBLE_TIME))) {
        setIsDouble(true)
        setIsTriple(false)
        setIsSingle(false)
      }

      if (seconds === 10) console.log('avg: ', ((elixir - 6)/10));

    } else if (!isActive && seconds !== 0) {
      clearInterval(timeInterval);
    }
    return () => {
      clearInterval(timeInterval);
    }
  }, [isActive, seconds, DOUBLE_TIME, TRIPLE_TIME, isDouble, isOvertime, isSingle]);

  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress className={classes.circle} size={'25rem'} thickness={1.5} variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography className={classes.elixir} variant="caption" component="div" color="textSecondary"
            >{(props.value/10).toFixed(1)}
          </Typography>
        </Box>
      </Box>
    );
  }

  const icon = () => {
    <Figure>
      <Figure.Image 
        width={100}
        height={180}
        src="https://static.wikia.nocookie.net/clashroyale/images/4/43/Elixir.png" 
      />
    </Figure>
  }

  return (
    <div>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={2} className='drawer' >
          <Sidebar />
        </Grid>
      <Grid item xs={8}className='elixir' >
        <Grid container justifyContent='center' alignItems='center'>
          <CircularProgressWithLabel className={classes.circle} value={Math.abs(elixir)*10} />
        </Grid>
      </Grid>
      <Drawer variant='permanent' anchor='right' className={classes.drawer} 
              classes={{ paper: classes.drawerPaper }}>
        <Grid item xs={5}className='timer' >
          <Grid container direction='column' justifyContent='space-between' alignItems='center'>
            <Grid container justifyContent='center' alignItems='center' className='status'>
            <br/>
            <br/>

              <ButtonGroup aria-label="vertical contained primary button group" color='primary'
                orientation='vertical' variant='text' disableElevation>
                <Button className={classes.status} disabled={isSingle}>
                  {isSingle ? <Typography className={classes.statusText}>1x</Typography> : '1x'}
                </Button>
                <Button className={classes.status} disabled={!isDouble}>
                  {isDouble ? <Typography className={classes.statusText}>2x</Typography> : '2x'}
                </Button>
                <Button className={classes.status} disabled={!isTriple}>
                  {isTriple ? <Typography className={classes.statusText}>3x</Typography> : '3x'}
                </Button>
                <Button className={classes.status} disabled={!isOvertime}>
                  {isOvertime ? <Typography className={classes.statusText}>Overtime</Typography> : 'Overtime'}
                </Button>
              </ButtonGroup>
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Typography variant='h3' className={classes.timer}>{timer}</Typography>
            <ButtonGroup orientation='vertical'>
              <ButtonGroup color='primary' aria-label='text primary button group'>
                <Tooltip title="Increase timer" placement="left-start" enterDelay={500} leaveDelay={0} arrow> 
                  <IconButton className={classes.button} onClick={decrease}>
                    <ArrowBackIosIcon />
                  </IconButton> 
                </Tooltip>
                <Tooltip title='Decrease timer' placement='right-start' enterDelay={500} leaveDelay={0} arrow>
                  <IconButton className={classes.button} onClick={increase}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Tooltip>                     
              </ButtonGroup>
              <ButtonGroup color='primary' aria-label='text primary button group'>
                <Tooltip title={isActive ? 'Pause' : 'Play'} placement='left-end' enterDelay={500} leaveDelay={0} arrow>
                  <IconButton className={classes.button} onClick={toggle}>
                    {isActive ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title='Revert' placement='right-end' enterDelay={500} leaveDelay={0} arrow>
                  <IconButton className={classes.button} onClick={reset}>
                    <RedoIcon />
                  </IconButton>
                </Tooltip>              
              </ButtonGroup>
            </ButtonGroup>    
          </Grid>
        </Grid>
      </Drawer>
    </Grid>
  </div>
    
  );
};

export default Timer;