import styled from '@emotion/styled';
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

  return (
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
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  // TODO: 아래 onClose prop을 func로 타입검사를 넣으면 onClose가 동작을 안한다. 왜 일까?
  // TODO: onClose에 전달받는것은 화살표 함수인데 화살표 함수도 함수로 인식할텐데... 객체로 테스트해봐도 안된다.
  // onClose: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  backgroundColor: Common.colors.background_modal,
};

export default Modal;
