import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PublicRoute = ({ children, restricted }) => {
  const { userInfo } = useUser();
  return userInfo && restricted ? <Navigate replace to="/" /> : children;
};

PublicRoute.defaultProps = {
  restricted: false,
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  restricted: PropTypes.bool,
};

export default PublicRoute;
