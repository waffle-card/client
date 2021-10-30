import { useState } from 'react';
import { Modal, Text, Card } from '@components';
import styled from '@emotion/styled';
// import Common from '@styles';

export default {
  title: 'Component/Base/Modal',
  component: Modal,
};

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Default = args => {
  return (
    <div>
      <StyledModal {...args}>
        <Text>모달</Text>
        <Card width={200} height={300} backgroundColor="royalblue" />
      </StyledModal>
    </div>
  );
};
Default.argTypes = {
  visible: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
  width: {
    defaultValue: '80vw',
    control: { type: 'text' },
  },
  height: {
    defaultValue: '80vh',
    control: { type: 'text' },
  },
  backgroundColor: {
    // defaultValue: Common.colors.speech_bubble,
    control: { type: 'color' },
  },
  onClose: {
    control: { action: 'onClose' },
  },
};

export const Usage = args => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <StyledModal visible={visible} onClose={handleClose} {...args}>
        <Text>모달</Text>
        <Card width={200} height={300} backgroundColor="royalblue" />
      </StyledModal>
    </div>
  );
};

export const TestInputInModal = args => {
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

export const TestInput = args => {
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
