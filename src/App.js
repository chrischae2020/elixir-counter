import './App.css';
import Timer_min from './components/Timer_min';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Helmet} from 'react-helmet'

import Home from './components/Home';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import ChangeLogs from './components/ChangeLog';

function App() {

  return (
      <Router>
        <SnackbarProvider 
          maxSnack={5} 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          TransitionComponent={Slide}>
          <Switch>
            <Route exact path='/'>
              <Timer />
            </Route>
            <Route exact path='/instructions' >
              <Instructions />
            </Route>
            {/* <Route exact path='/elixir-counter'>
              <Timer />
            </Route> */}
          </Switch>
        </SnackbarProvider>
      </Router>
  );
}

export default App;
