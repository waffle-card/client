import {
  // Button,
  CardEditModal,
  // HashTagInput,
  // EmojiPickerActiveButton,
} from '@/components';
// import { useState } from 'react';

export default {
  title: 'Component/Domain/CardEditModal',
};

export const Default = args => {
  const handleSubmit = waffleCard => {
    console.log('제출!', waffleCard);
  };
  return <CardEditModal {...args} onSubmit={handleSubmit} />;
};
Default.argTypes = {
  visible: {
    defaultValue: true,
    control: { type: 'boolean' },
  },
  initialCardData: {
    defaultValue: { id: '', emoji: '🦁' },
    control: { type: 'object' },
  },
  onClose: { action: 'onClose' },
  onSubmit: { action: 'onSubmit' },
};

// export const Usage = () => {
//   const [visible, setVisible] = useState(false);

//   const handleClose = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <button type="button" onClick={() => setVisible(true)}>
//         Show CardEditModal
//       </button>
//       <CardEditModal visible={visible} onClose={handleClose} />
//     </>
//   );
// };

// export const Inputs = args => {
//   return <HashTagInput {...args} />;
// };
// Inputs.argTypes = {
//   onChange: { action: 'onChange' },
// };

// export const PickerButton = args => {
//   return (
//     <>
//       <h4>이모지</h4>
//       <EmojiPickerActiveButton {...args} />
//       <h4>배경색</h4>
//       <Button backgroundColor="royalblue" />
//       <h4>해시태그</h4>
//       <Button backgroundColor="royalblue" />
//     </>
//   );
// };
// PickerButton.argTypes = {
//   disabled: {
//     defaultValue: false,
//     control: { type: 'boolean' },
//   },
//   onChange: { action: 'onChange' },
// };
