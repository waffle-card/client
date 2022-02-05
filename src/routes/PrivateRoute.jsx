import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useUser();
  return (
    <Route
      element={userInfo ? <Component /> : <Navigate replace to="/login" />}
      {...rest}
    />
  );
};

PrivateRoute.defaultProps = {
  to: '/signin',
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
