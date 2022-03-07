import styled from '@emotion/styled';
// import { useClickAway } from '@/hooks';
import Common from '@/styles';
import { Portal } from '@/components';
// import { forwardRef } from 'react';

interface ModalProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  onClose?: () => void;
}

const Modal = ({
  children,
  visible,
  width,
  height,
  backgroundColor = Common.colors.background_modal,
  onClose,
  ...props
}: ModalProps) => {
  //TODO(윤호): 모달에서 Swal 사용으로 모달이 닫히는 현상 발생하여 클릭어웨이 제거, 다른방식이 있는지 고민해보기
  // const ref = useClickAway(() => {
  //   onClose && onClose();
  // });

  return (
    <Portal>
      <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
        <ModalContainer
          // ref={ref}
          width={width}
          height={height}
          backgroundColor={backgroundColor}
          {...props}
        >
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

const ModalContainer = styled.div<ModalProps>`
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

export default Modal;
