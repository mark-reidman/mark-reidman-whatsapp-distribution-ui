import React, {useContext} from 'react';
import { Button } from "reactstrap";
import { GoogleAuthContext } from 'oath/GAuth.js';


const GLogoutButton = () => {
    
    const { googleLogoutAuth } = useContext(GoogleAuthContext);

    return (
      <Button 
          onClick={googleLogoutAuth.signOut}
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
  };

  export default GLogoutButton;