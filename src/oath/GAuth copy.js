import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};


function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const login = (user) => {
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };
    
    // Return the user object and auth methods
    return {
      user,
      isAuthenticated,
      login,
      logout
    };
  }