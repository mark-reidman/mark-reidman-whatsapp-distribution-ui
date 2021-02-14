import React, { useContext, useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button, Spinner } from "reactstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {AuthContext} from './AuthContext'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const SERVER_URL = process.env.REACT_APP_API_URL;

const GoogleButton = ({redirect, rememberme}) => {

  const history = useHistory();
  const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken] = useContext(AuthContext);
  const [isGetSigninProgress, setIsGetSigninProgress] = useState(false);

  const login = (response) => {

    const that = this;
    setIsGetSigninProgress(true)

    async function complete_auth() {
      var formData = new FormData();
      formData.set("id_token", response.tokenObj.id_token);
      try {
          const res = await axios.post(SERVER_URL + '/auth/glogin', formData);
          setAuthUser(res.data);
          setAuthIsLogined(true);
          setIsGetSigninProgress(false)
          setTimeout(()=>{
            history.push({pathname: redirect, state: {redirected: true}});
          }, 500)
          
  
      } catch(e) {
          console.log(e)
      }
    }

    if(response.accessToken) {
        complete_auth();        
    }
  }

  const logout = (response) => {
        axios.get(SERVER_URL + '/auth/logout')
        setAuthUser(null)
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
      { isLogined && user != null && user.auth_provider === "google" ?
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
        </GoogleLogout>
        : 
        <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ login }
          render={renderProps => (
            <Button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled || isGetSigninProgress || (isLogined && user != null && user.auth_provider !== "google")}
                className="btn-1" color="primary" outline type="button"
                color="primary"
                type="button"
                >
                  <span className="btn-inner--icon mr-1">
                      
                      {!isGetSigninProgress ? <i className="fab fa-google" aria-hidden="true"></i> : <Spinner color="primary" type="grow" size="sm"></Spinner>}
                      
                  </span>
                  <span className="btn-inner--text">Google</span>
                  
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
