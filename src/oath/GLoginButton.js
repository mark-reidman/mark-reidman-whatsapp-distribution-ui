import React, {useContext} from 'react';
import { Button } from "reactstrap";
import { GoogleAuthContext } from 'oath/GAuth.js';


export const GLoginButton = () => {
    const { googleLoginAuth } = useContext(GoogleAuthContext);
    console.log(googleLoginAuth.signIn)
    return (
      <Button 
          onClick={googleLoginAuth.signIn}
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
  };

export default GLoginButton;