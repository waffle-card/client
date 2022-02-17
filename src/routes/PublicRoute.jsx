import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';

const PublicRoute = ({ component: Component, restricted }) => {
  const userInfo = useRecoilValue(userState);
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
