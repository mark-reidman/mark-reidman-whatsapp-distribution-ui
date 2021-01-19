import React, { useEffect, useState } from "react";
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';


// const ContextProps ={
//     user: null,
//     isAuthenticated: false,
//     setUser: null,
//     loadingAuthState: false,
//     googleLoginAuth: {},
//     googleLogoutAuth: {}
// }

export const GoogleAuthContext = React.createContext()

const _clientId = '846260690124-46sosrvga0r22u0ngq5oh2hiimmdmugo.apps.googleusercontent.com';

export const GoogleAuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSuccess = (res) => {
    setUser(res.profileObj);
    setLoadingAuthState(false);
    setIsAuthenticated(true);
    console.log('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
  };

  const onLogoutSuccess = (res) => {
    // auth.logout();
    console.log('Logged out Success');
    setIsAuthenticated(false);
    removeRefreshTokenSetup();
  };

  const onFailure = (res) => {
    setIsAuthenticated(false);
    removeRefreshTokenSetup();
    console.log('Login failed: res:', res);
  };

  const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    localStorage.setItem('authToken', res.tokenId);
  
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log('newAuthRes:', newAuthRes);
      // saveUserToken(newAuthRes.access_token);  <-- save new token
      localStorage.setItem('authToken', newAuthRes.tokenId);
  
      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming);
    };
  
    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  };
  
  const removeRefreshTokenSetup = () => {
  
    localStorage.setItem('authToken', null);
  };

  const googleLoginAuth = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: _clientId,
    isSignedIn: false,
    accessType: 'offline',
  });

  const googleLogoutAuth = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId: _clientId
  });
  

  return (
    <GoogleAuthContext.Provider value={{
      user,
      isAuthenticated: isAuthenticated,
      setUser,
      loadingAuthState,
      googleLoginAuth,
      googleLogoutAuth
    }}>
      {children}
    </GoogleAuthContext.Provider>
  )
};
// export const useGoogleAuth = () => React.useContext(GoogleAuthContext)


