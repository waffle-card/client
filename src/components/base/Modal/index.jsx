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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  border-radius: 16px;
  box-shadow: ${Common.shadow.modal};
  background-color: ${Common.colors.background_modal};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const Modal = ({ children, width, height, visible, onClose, ...props }) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const containerStyle = useMemo(() => ({ width, height }), [width, height]);

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
        ref={ref}
        {...props}
        style={{ ...props.style, ...containerStyle }}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    element,
  );
};

Modal.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  width: 400,
  height: 400,
  visible: false,
};

export default Modal;
