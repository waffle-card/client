import { useState } from 'react';
import { Modal, ModalProps, Text, WaffleCard } from '@/components';
import styled from '@emotion/styled';
// import Common from '@/styles';

export default {
  title: 'Component/Molecule/Modal',
  component: Modal,
};

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Default = () => {
  return (
    <div>
      <StyledModal>
        <Text>모달</Text>
        <WaffleCard />
      </StyledModal>
    </div>
  );
};
// Default.argTypes = {
//   visible: {
//     defaultValue: false,
//     control: { type: 'boolean' },
//   },
//   width: {
//     defaultValue: '80vw',
//     control: { type: 'text' },
//   },
//   height: {
//     defaultValue: '80vh',
//     control: { type: 'text' },
//   },
//   backgroundColor: {
//     // defaultValue: Common.colors.speech_bubble,
//     control: { type: 'color' },
//   },
//   onClose: {
//     control: { action: 'onClose' },
//   },
// };

export const Usage = ({ ...args }: ModalProps) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <StyledModal visible={visible} onClose={handleClose} {...args}>
        <Text>모달</Text>
        <WaffleCard />
      </StyledModal>
    </div>
  );
};

export const TestInputInModal = ({ ...args }: ModalProps) => {
  const [state, setState] = useState('');

  return (
    <div>
      <Modal visible {...args}>
        <Text>모달</Text>
        <input
          type="text"
          onChange={e => {
            setState(e.target.value);
          }}
        />
        <p>{state}</p>
      </Modal>
    </div>
  );
};

export const TestInput = () => {
  const [state, setState] = useState('');

  return (
    <div>
      <input
        type="text"
        onChange={e => {
          setState(e.target.value);
        }}
      />
      <p>{state}</p>
    </div>
  );
};
