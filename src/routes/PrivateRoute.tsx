import React from 'react';
import { Navigate } from 'react-router-dom';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({
  component: Component,
}: PrivateRouteProps): JSX.Element => {
  const userInfo = useRecoilValue(userState);
  return userInfo ? <Component /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
