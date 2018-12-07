import { capitalize } from 'lodash';
import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';;

class CategoryNav extends Component {

  state = {
    active: 'All Categories',
  }

  handleOnSelect = (eventKey) => {
    this.setState({ active: eventKey })
  }

  render() {

    let { categories } = this.props

    return (
      <div>
        <Nav bsStyle='tabs' activeKey={this.state.active} onSelect={e => this.handleOnSelect(e)}>
          <NavItem eventKey='All Categories'>
            All Categories
          </NavItem>
          {categories.map(category =>
            <NavItem
              eventKey={category.name}>
              {capitalize(category.name)}
            </NavItem>
          )}
        </Nav>
      </div>
    );
  }

}

export default withRouter(CategoryNav)