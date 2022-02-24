import React from 'react';
import { Navigate } from 'react-router-dom';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';

interface PublicRouteProps {
  component: React.ComponentType;
  restricted?: boolean;
}

const PublicRoute = ({
  component: Component,
  restricted,
}: PublicRouteProps): JSX.Element => {
  const userInfo = useRecoilValue(userState);
  return userInfo && restricted ? <Navigate replace to="/" /> : <Component />;
};

PublicRoute.defaultProps = {
  restricted: false,
};

export default PublicRoute;
