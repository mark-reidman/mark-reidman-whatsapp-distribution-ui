import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { Button } from "reactstrap";
// import { useAuth } from "oath/use-auth.js";

const clientId = '846260690124-46sosrvga0r22u0ngq5oh2hiimmdmugo.apps.googleusercontent.com';

function GLogoutHook() {
  // let auth = useAuth();

  const onLogoutSuccess = (res) => {
    // auth.logout();
    console.log('Logged out Success');
  };

  const onFailure = () => {
    // auth.logout();
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <Button 
        onClick={signOut}
        // className="btn-icon btn-3 ml-1"
        className="btn-1" color="primary" outline type="button"
        color="primary"
        type="button"
    >
      <span className="btn-inner--icon mr-1">
        <i className="fa fa-google" aria-hidden="true"></i>    
      </span>
      <span className="btn-inner--text">Logout</span>
    </Button>
  );
}

export default GLogoutHook;