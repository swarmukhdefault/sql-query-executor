import React, { createContext, useState, useContext, useEffect, FunctionComponent } from 'react';

import { LoggedInUser } from '@util/models';

interface AuthContextType {
  loggedInUser: boolean;
  isAuthenticated(): boolean;
  logout(): void;
  setLoggedInUser(user: LoggedInUser): void;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const AuthContext = createContext<AuthContextType>({
  loggedInUser: false,
  isAuthenticated: () => false,
  logout: () => {},
  setLoggedInUser: (user: LoggedInUser) => {}
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  const isAuthenticated = (): boolean => !!user;

  const setLoggedInUser = (loggedInUser: LoggedInUser): void => {
    setUser(loggedInUser);

    if (loggedInUser) {
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('access-token', loggedInUser.tokens.accessToken);
    }
  };

  useEffect(() => {
    try {
      const storedUserInLocalStorage = localStorage.getItem('user');

      if (!isAuthenticated() && storedUserInLocalStorage) {
        setLoggedInUser(JSON.parse(storedUserInLocalStorage));
      }
    } catch (e) {
      // report error depending on app error-reporting guide
    }
  }, [user]);

  const logout = (): void => {
    setLoggedInUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ loggedInUser: user, isAuthenticated, setLoggedInUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

export default AuthProvider;
