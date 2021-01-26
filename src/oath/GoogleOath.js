import React, { useContext, useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button } from "reactstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AuthContext from './AuthContext'

const CLIENT_ID = '846260690124-46sosrvga0r22u0ngq5oh2hiimmdmugo.apps.googleusercontent.com';
const SERVER_URL = 'http://127.0.0.1:5000'

const GoogleButton = (props) => {

  const history = useHistory();
  const {user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken} = useContext(AuthContext)

  const login = (response) => {

    const that = this;

    async function complete_auth() {
      var formData = new FormData();
      formData.set("id_token", response.tokenObj.id_token);
      try {
          const res = await axios.post(SERVER_URL + '/auth/login', formData)
          setAuthUser(res.data)
          setAuthToken(res.data.token)
          setAuthIsLogined(true)
          history.push("/sections");
  
      } catch(e) {
          console.log(e)
      }
    }

    if(response.accessToken) {
        complete_auth();        
    }
  }

  const logout = (response) => {
        axios.get('http://127.0.0.1:5000/auth/logout')
        setAuthUser(null)
        setAuthToken(null)
        setAuthIsLogined(false)
  }

  const handleLoginFailure = (response) => {
    alert('Failed to log in')
  }

  const handleLogoutFailure = (response) => {
    alert('Failed to log out')
  }

  return (
    <div>
      { isLogined ?
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
                <i className="fab fa-google" aria-hidden="true"></i>    
            </span>
            <span className="btn-inner--text">Logout</span>
            </Button>
          )}
          onLogoutSuccess={ logout }
          onFailure={ handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ login }
          render={renderProps => (
            <Button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn-1" color="primary" outline type="button"
                color="primary"
                type="button"
                >
                <span className="btn-inner--icon mr-1">
                    <i className="fab fa-google" aria-hidden="true"></i>
                </span>
                <span className="btn-inner--text">Login with Google</span>
                </Button>
          )}
          onFailure={ handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }

      {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}

    </div>
  )
}

export default GoogleButton;
