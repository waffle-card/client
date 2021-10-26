import { useState } from 'react';
import { Modal, Text, Card } from '@components';
import styled from '@emotion/styled';
import Common from '@styles';

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
      <StyledModal visible {...args}>
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
    defaultValue: 400,
    control: { type: 'number' },
  },
  height: {
    defaultValue: 400,
    control: { type: 'number' },
  },
  backgroundColor: {
    defaultValue: Common.colors.background_modal,
    control: { type: 'color' },
  },
  onClose: {
    control: { action: 'onClose' },
  },
};

export const Usage = args => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <StyledModal visible={visible} onClose={() => setVisible(false)}>
        <Text>모달</Text>
        <Card width={200} height={300} backgroundColor="royalblue" />
      </StyledModal>
    </div>
  );
};
