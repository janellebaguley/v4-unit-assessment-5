import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {updateUser, logout} from './../../redux/reducer';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser= () => {
    axios.get('/api/auth/me')
    .then(res => {
      this.props.updateUser(res.data)
      this.props.history.push('/Dash')
    })
    .catch(err => console.log(err))
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(() => {this.props.logout();
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }
  
  render() {
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic'></div>
            <p>{this.props.username}</p>
          </div>
          <div className='nav-links'>
            <Link to = '/dash'>
              <img className='nav-img' src={homeLogo} alt='home' />
            </Link>
            <Link to = '/Form'>
            <img className='nav-img' src={newLogo} alt='new post' />
            </Link>
          </div>
            <Link to = '/Auth'>
          <img className='nav-img logout' src={logoutLogo} alt='logout' />
            </Link>
        </div>
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {updateUser, logout})(withRouter(Nav));