import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useJwt } from 'react-jwt';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface TokenContext {
  token: string | null;
  setToken: (newToken: string) => void;
}

interface TokenPayload extends JwtPayload {
  username: string;
  role: string;
}

const AuthContext = createContext<TokenContext>({
  token: '',
  setToken: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);

      const decoded = jwtDecode<TokenPayload>(token);
      const isExpired = Date.now() > (decoded?.exp || 0);

      if (isExpired) {
        localStorage.removeItem('token');
        setToken_(null);
      }
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return <AuthContext value={contextValue}>{children}</AuthContext>;
};
