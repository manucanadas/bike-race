import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { removeActiveUser } from '../actions/users';

class Navbar extends React.Component {

  state = {
    click: false,
    button: true
  }

  handleClick = () => {
    this.setState({ click: !this.state.click })
  }

  closeMobileMenu = () => {
    this.setState({ click: false })
  }

  showButton = () => {
    if (window.innerWidth <= 960) {
      this.setState({ button: false })
    } else {
      this.setState({ button: true })
    }
  }

  componentDidMount() {
    this.showButton()
  }

  render() {

    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={this.closeMobileMenu}>
              BikeMates <i className='fas fa-biking' />
            </Link>
            <div className='menu-icon' onClick={this.handleClick}>
              <i className={this.state.click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>

            <ul className={this.state.click ? 'nav-menu active' : 'nav-menu'}>

              {this.props.activeUser &&
                <li className='nav-item'>
                  <Link to='/events/new' className='nav-links' onClick={this.closeMobileMenu}>
                    Create Event
                </Link>
                </li>
              }

              {this.props.activeUser &&
                <li className='nav-item'>
                  <Link to='/events' className='nav-links' onClick={this.closeMobileMenu}>
                    View Events
                </Link>
                </li>
              }

              {this.props.activeUser &&
              <li className='nav-item'>
                <Link to='/users/active' className='nav-links' onClick={this.closeMobileMenu}>
                  {this.props.activeUser.username}
                </Link>
              </li>
              }

              {this.props.activeUser &&
                <li className='nav-item'>
                  <Link to='' className='nav-links' onClick={() => {
                    this.closeMobileMenu()
                    this.props.dispatch(removeActiveUser())
                  }}>
                    Logout
                  </Link>
                </li>
              }

              {!this.props.activeUser &&
                <li className='nav-item'>
                  <Link to='/users/new' className='nav-links' onClick={this.closeMobileMenu}>
                    Sign up!
                </Link>
                </li>
              }

              {!this.props.activeUser &&
                <li className='nav-item'>
                  <Link to='/login' className='nav-links' onClick={this.closeMobileMenu}>
                    Login
                </Link>
                </li>
              }

            </ul>
          </div>
        </nav>
      </>
    )
  }
}

function ms2p(globalState) {
  return {
    activeUser: globalState.activeUser
  }
}

export default connect(ms2p)(Navbar)