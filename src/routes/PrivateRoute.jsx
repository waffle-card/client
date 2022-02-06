import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PrivateRoute = ({ component: Component }) => {
  const { userInfo } = useUser();
  return userInfo ? <Component /> : <Navigate replace to="/login" />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
