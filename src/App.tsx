import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import { CustomRoutes } from './CustomRoutes';

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // return (
  //   <AuthProvider>
  //     <Router />
  //   </AuthProvider>
  // );
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};
