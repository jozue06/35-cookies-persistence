import React, { Component } from 'react';
import {  Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import S from './styles/styles.js'
import { logIn, logout, signup} from '../reducers/auth';
import Login from '../components/Login.js';
class Landing extends Component {

  componentDidMount() {
    if(localStorage && localStorage.token) {
      this.props.logIn();
    }
  }
  
  
  render() {
    return (
      <S.Wrapper>
        {!this.props.userState ? <Login logIn={this.props.logIn}/> : <Redirect to={{pathname: '/dashboard'}}/>}
        <p>Don't have an account? <Link to='/signup'>Create an Account</Link></p>
      </S.Wrapper>
    );
  }
}
const mapStateToProps = state => ({ userState: state.userState });
const mapDispatchToProps = dispatch => ({
  logIn: user => dispatch(logIn(user)),
  logout: user => dispatch(logout(user)),
  signup: user => dispatch(signup(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);