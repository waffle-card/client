import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { userInfo } = useUser();
  return (
    <Route
      element={
        userInfo && restricted ? <Navigate replace to="/" /> : <Component />
      }
      {...rest}
    />
  );
};

PublicRoute.defaultProps = {
  restricted: false,
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  restricted: PropTypes.bool,
};

export default PublicRoute;
