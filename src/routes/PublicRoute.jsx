import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { userInfo } = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        userInfo && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
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
