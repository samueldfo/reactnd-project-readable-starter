import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/home.component';
import Post from './components/post.component';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/:categoryPath' component={Home} />
          <Route exact path='/:categoryPath/:postId' component={Post} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  null,
)(App))
