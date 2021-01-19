import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { Button } from "reactstrap";
import { useAuth } from "oath/use-auth.js";

// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '846260690124-46sosrvga0r22u0ngq5oh2hiimmdmugo.apps.googleusercontent.com';

function GLoginHooks() {
  let auth = useAuth();

  const onSuccess = (res) => {
    auth.login(res.profileObj)
    console.log('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    auth.logout()
    console.log('Login failed: res:', res);
  };

  const {signIn} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    //responseType: 'code',
    //prompt: 'consent',
  });

  return (
    <Button 
        onClick={signIn}
        className="btn-1" color="primary" outline type="button"
        color="primary"
        type="button"
    >
      <span className="btn-inner--icon mr-1">
        <i className="fa fa-google" aria-hidden="true"></i>
      </span>
      <span className="btn-inner--text">Login with Google</span>
    </Button>
  );
}

export default GLoginHooks;