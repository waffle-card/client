import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userState } from '@recoil';
import { useRecoilValue } from 'recoil';

const PrivateRoute = ({ component: Component }) => {
  const userInfo = useRecoilValue(userState);
  return userInfo ? <Component /> : <Navigate replace to="/login" />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
