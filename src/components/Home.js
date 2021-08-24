import React from 'react';
import Grid from '@material-ui/core/Grid';
import Timer_min from './Timer_min';
import Sidebar from './Sidebar';
import Paper from '@material-ui/core/Paper'

export default function Home() {
  return (
    <Grid container='row' direction='column' justifyContent='center' alignItems='center'>
      <Grid item xs={2}>
        <Paper>
          <Sidebar />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper>
          <Timer_min />
        </Paper>
      </Grid>
    </Grid>
  )
}