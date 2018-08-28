import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { signUpAction } from '../../action/logIn-action.js';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  }

  handleChange = (e) => {
     this.setState({
      [e.target.name]: e.target.value,
    });

  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.password !== this.state.passwordConfirm) {
      alert('passwords do not match');
      this.setState({ password: '', passwordConfirm: '' });
    } else {
      this.props.signUpAction(this.state);
    }
  }

  componentWillUnmount() {
    this.setState({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    });
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <Fragment>
          <h3>Create an account</h3>

          <form onSubmit={this.handleSubmit}>

            <label>
              username:
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            </label>

            <br />

            <label>
              email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>

            <br />

            <label>
              password:
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>

            <br />

            <label>
              confirm password:
              <input type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} />
            </label>

            <br />

            <input type="submit" value="sign up" />

          </form>

        </Fragment>

      );
    }
  }
}

const matchStateToProps = state => ({ isLoggedIn: state.isLoggedIn })

const matchDispatchToProps = dispatch => ({
  // signUpAction: newUser => dispatch(signUpAction(newUser)),
});

export default connect(matchStateToProps, matchDispatchToProps)(SignUp);