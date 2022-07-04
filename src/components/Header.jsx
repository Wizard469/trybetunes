import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <>
            <h4 data-testid="header-user-name">{ user.name }</h4>
            <nav>
              <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
              <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
              <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
