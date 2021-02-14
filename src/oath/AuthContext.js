import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';

export const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isLogined, setIsLogined] = useState(false);
    const [token, setToken] = useState(null);

    const setAuthUser = (data, rememberme) => {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        // if (rememberme) {
        //     sessionStorage.setItem("user", JSON.stringify(data));
        // }
    };

    const setAuthIsLogined = (boolean) => {
        setIsLogined(boolean);
        sessionStorage.setItem("isLogined", boolean);
    };

    const setAuthToken = (token) => {
        setToken(token);
        sessionStorage.setItem("token", JSON.stringify(token));
    };

    async function isAuth() {
        // axios(apiOptions)
        //   .then((response) => {
        //     const resData = response.data;
        //     resData === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        //   })
        //   .catch((error) => {
        //     console.log(error.response);
        //   });
    }

    useEffect(() => {
        const user_data = JSON.parse(sessionStorage.getItem('user'));
        const user_isLogined = JSON.parse(sessionStorage.getItem('isLogined'));
        // const user_token = JSON.parse(sessionStorage.getItem('token'));

        setUser(user_data != null ? user_data : null)
        setIsLogined(user_isLogined != null ? user_isLogined : null)
        // setToken(user_token != null ? user_token : null)
        // isAuth();
    }, []);

    return (
      <AuthContext.Provider value={[user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken]}>
        {props.children}
      </AuthContext.Provider>
    );
}
