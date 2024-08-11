import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function PrivateRoute({ element: Component, ...rest }) {
  const { token } = useAuth();
  
  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
