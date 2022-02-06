import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useUser();
  return userInfo ? children : <Navigate replace to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
