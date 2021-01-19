import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button } from "reactstrap";
import axios from 'axios';

const CLIENT_ID = '846260690124-46sosrvga0r22u0ngq5oh2hiimmdmugo.apps.googleusercontent.com';


class GoogleButton extends Component {
   constructor(props) {
    super(props);

    const data = JSON.parse(sessionStorage.getItem('userData'));
    this.state = {
      user: data ? data.user : null,
      isLogined: data ? data.isLogined : false
    }

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {

    const that = this;

    async function complete_auth() {
      var formData = new FormData();
      console.log(response)
      formData.set("id_token", response.tokenObj.id_token);
      try {
          const res = await axios.post('http://127.0.0.1:5000/auth/login', formData)
          console.log(res.data)
          const userData = {
            isLogined: true,
            user: res.data
          }
          console.log(that);
          that.setState(userData);
          
          sessionStorage.setItem("userData", JSON.stringify(userData));
  
      } catch(e) {
          console.log(e)
      }
    }

    if(response.accessToken) {
        complete_auth();        
    }
  }

  logout (response) {
        const userData = {
            isLogined: false,
            user: null,
            accessToken: ''
        };
        axios.get('http://127.0.0.1:5000/auth/logout')
        this.setState(state => (userData));
        sessionStorage.setItem("userData", JSON.stringify(userData));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          render={renderProps => (
            <Button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn-1" color="primary" outline type="button"
                color="primary"
                type="button"
            >
            <span className="btn-inner--icon mr-1">
                <i className="fa fa-google" aria-hidden="true"></i>    
            </span>
            <span className="btn-inner--text">Logout</span>
            </Button>
          )}
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          render={renderProps => (
            <Button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn-1" color="primary" outline type="button"
                color="primary"
                type="button"
                >
                <span className="btn-inner--icon mr-1">
                    <i className="fa fa-google" aria-hidden="true"></i>
                </span>
                <span className="btn-inner--text">Login with Google</span>
                </Button>
          )}
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null }

    </div>
    )
  }
}

export default GoogleButton;