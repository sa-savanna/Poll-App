import React, { lazy, Suspense } from 'react';
import './App.scss';
import Home from './Components/Home'
import { Box, Container, Grid, Button } from '@material-ui/core';
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
          py: 3
        }}>
        <Container maxWidth={false} spacing={3}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              lg={12}
            >
              <Button variant="contained" color="primary" href="/admin">
                For Admin
              </Button>
              
            </Grid>
            <Grid item xs
            >
              <Switch>
                <Route exact path="/"><Home /></Route>
                <Suspense fallback={<>loading...</>}>
                  <Route path="/admin" component={asyncAdmin}></Route>
                </Suspense>
              </Switch>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Router>
  )
}

export default App;
