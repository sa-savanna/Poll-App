import React, { lazy, Suspense } from 'react';
import './App.scss';
import Home from './Components/Home'
import { Box, Grid, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const asyncAdmin = lazy(() => {
  return import('./Components/Admin')
})


const App = () => {
  return (
    <Router>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 15
        }}>
        <div className='nav-buttons'>
          <Button variant="contained" color="primary" href="/admin">
            For Admin
              </Button>
          <Button variant="contained" color="primary" href="/">
            Home
              </Button>
        </div>
        <Grid item lg={12}>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Suspense fallback={<>loading...</>}>
              <Route path="/admin" component={asyncAdmin}></Route>
            </Suspense>
          </Switch>
        </Grid>
      </Box>
    </Router >
  )
}

export default App;
