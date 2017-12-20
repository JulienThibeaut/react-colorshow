import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import App from './../App'
import VideoContainer from './../containers/VideoContainer'
import './../App.css';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/?watch" component={VideoContainer} />
    </Switch>
  </Router>
)

export default Routes
