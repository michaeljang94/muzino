import React from 'react';
import { Navigate } from 'react-router-dom';

export const MissingRoute = () => {
  return <Navigate to={{ pathname: '/' }} />;
};
