import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        userInfo ? <Component {...props} /> : <Redirect to="/login" />
      }
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
