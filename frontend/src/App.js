import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/home.component';
import Post from './components/post.component';
import Error404 from './components/error-404.component'

class App extends Component {

  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/:categoryPath' component={Home} />
          <Route exact path='/:categoryPath/:id' component={Post} />
          <Route component={ Error404 } />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  null,
)(App))
