import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import Header from './components/Header';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/login" />
      {/* сделать роут логин с редиректом на "/"  ez. window.location in componentDidMount worked.*/}
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
)

export default AppRouter;