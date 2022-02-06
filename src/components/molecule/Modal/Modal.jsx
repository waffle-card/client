import styled from '@emotion/styled';
import { useClickAway } from '@hooks';
import PropTypes from 'prop-types';
import Common from '@styles';
import { Portal } from '@components';

const Modal = ({
  children,
  visible = false,
  width,
  height,
  backgroundColor,
  onClose,
  ...props
}) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  return (
    <Portal>
      <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
        <ModalContainer
          ref={ref}
          width={width}
          height={height}
          backgroundColor={backgroundColor}
          {...props}>
          {children}
        </ModalContainer>
      </BackgroundDim>
    </Portal>
  );
};

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
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  min-width: 290px;
  max-width: 1000px;
  min-height: 100px;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: ${Common.shadow.modal};
  box-sizing: border-box;
`;

Modal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  backgroundColor: Common.colors.background_modal,
};

export default Modal;
