import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Common from '@styles';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Portal } from '@components';

const Spinner = ({ loading, size, color, ...props }) => {
  return loading ? (
    <Portal>
      <BackgroundDim>
        <CircularProgress
          size={size}
          style={{ position: 'absolute', color, zIndex: 2000 }}
          {...props}
        />
      </BackgroundDim>
    </Portal>
  ) : null;
};

const BackgroundDim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  loading: false,
  size: 50,
  color: Common.colors.point,
};

export default Spinner;
