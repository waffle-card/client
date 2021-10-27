import ReactDom from 'react-dom';
import styled from '@emotion/styled';
import { useEffect, useMemo } from 'react';
import { useClickAway } from '@hooks';
import PropTypes from 'prop-types';
import Common from '@styles';

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  min-width: 290px;
  max-width: 1000px;
  min-height: 100px;
  transform: translate(-50%, -50%);
  padding: 8px;
  border-radius: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: ${Common.shadow.modal};
  box-sizing: border-box;
`;

const Modal = ({
  children,
  visible,
  width,
  height,
  backgroundColor,
  onClose,
  ...props
}) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const element = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  });

  return ReactDom.createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        ref={ref}
        {...props}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    element,
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  width: 400,
  height: 400,
  backgroundColor: Common.colors.background_modal,
};

export default Modal;
