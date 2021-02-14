import React, { useContext, useState } from 'react'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button, Spinner } from "reactstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {AuthContext} from './AuthContext';

const APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const SERVER_URL = process.env.REACT_APP_API_URL;


const FacebookButton = ({redirect, rememberme}) => {

    const history = useHistory();
    const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken] = useContext(AuthContext);
    const [isGetSigninProgress, setIsGetSigninProgress] = useState(false);
  
    const login = (response) => {
  
      const that = this;
  
      async function complete_auth() {
        var formData = new FormData();
        formData.set("id_token", response.accessToken);
        
        try {
            const res = await axios.post(SERVER_URL + '/auth/flogin', formData)
            setAuthUser(res.data)
            setAuthIsLogined(true)
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

    const componentClicked = (e) => {
        setIsGetSigninProgress(true)
    }
  
    const logout = () => {
          axios.get(SERVER_URL + '/auth/logout')
          setAuthUser(null)
          // setAuthToken(null)
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
          { isLogined && user != null && user.auth_provider === "facebook" ?
            <Button 
            onClick={logout}
            // disabled={renderProps.isDisabled}
            className="btn-1" 
            variant="contained"
            color="primary"
            outline type="button"
            color="primary"
            type="button"
            >
                <span className="btn-inner--icon mr-1">
                    <i className="fab fa-facebook" aria-hidden="true"></i>    
                </span>
                <span className="btn-inner--text">LOGOUT</span>
            </Button>
            :
           <FacebookLogin
            appId={ APP_ID }
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={login}
            onClick={componentClicked}
            onFailure={handleLoginFailure}
            cookie={false}
            autoLoad={false}
            responseType="code"
            render={renderProps => (
                <Button style={{padding: "10px"}}
                  onClick={renderProps.onClick}
                  disabled={renderProps.isDisabled || isGetSigninProgress || (isLogined && user != null && user.auth_provider !== "facebook")}
                  className="btn-1" 
                  variant="contained"
                  color="primary"
                  outline type="button"
                  color="primary"
                  type="button"
                >
                    <span className="btn-inner--icon mr-1">
                        {!isGetSigninProgress ? <i className="fab fa-facebook" aria-hidden="true"></i> : <Spinner color="primary" type="grow" size="sm"></Spinner>}
                    </span>
                    <span className="btn-inner--text">FACEBOOK</span>
                </Button>
            )}
          />
        }  
      </div>
    )
  }
  
  export default FacebookButton;
  

