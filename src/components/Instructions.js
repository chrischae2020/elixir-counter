import React from 'react';
import { useStyles } from './Styles';
import Sidebar from './Sidebar';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function Instructions() {

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={2} className='drawer' >
          <Sidebar />
        </Grid>
        <Grid item xs={8} className='cards' >
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 1</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                Use the arrow keys below the timer to set the time you want to start tracking
                the opponent's elixir.
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 2</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                If you're using the number keypad, make sure your number lock is off.
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 3</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                Start a 1v1 ladder match on Clash Royale.
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 4</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                When the in-game timer matches the timer on from Step 1, press the play button (or space bar).
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 5</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                Press the number key that matches the elixir the opponent just put down.
              </Typography>
              <Typography variant='p' className={classes.cardSub}>You should get a green alert in the bottom left corner if successful</Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 6</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                Watch the number in the middle of the circle; that's your opponent's elixir!
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle}>Step 7</Typography>
              <Typography variant='h6' className={classes.cardBody}>
                When your match is finished, press the 'revert' button and play again!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Instructions