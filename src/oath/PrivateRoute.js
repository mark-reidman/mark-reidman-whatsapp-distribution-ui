import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from './AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
    const [user, setAuthUser, isLogined, setAuthIsLogined, token, setAuthToken] = useContext(AuthContext)

    return (
        <Route {...rest} render={props => {
            
            if (!isLogined) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };