import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PublicRoute = ({ component: Component, restricted }) => {
  const { userInfo } = useUser();
  return userInfo && restricted ? <Navigate replace to="/" /> : <Component />;
};

PublicRoute.defaultProps = {
  restricted: false,
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  restricted: PropTypes.bool,
};

export default PublicRoute;
