import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/home.component';
// import PostDetail from './components/post-detail.component';
import Post from './components/post.component';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/404' render={() => (<h1>Page not found</h1>)}/> */}
          {/* <Route exact path='/posts/new' component={PostForm} /> */}
          <Route exact path='/:categoryPath' component={Home} />
          <Route exact path='/:categoryPath/:postId' component={Post} />
          {/* <Route exact path='/:categoryPath/:postId/edit' component={PostForm} /> */}
          {/* <Route exact path='/:categoryPath/:postId/comment/:commentId/edit' component={CommentForm} /> */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  null,
)(App))
