import { EmojiPicker, Button } from '@components';

export default {
  title: 'Component/Base/EmojiPicker',
};

export const Default = args => {
  return (
    <>
      <h4>이모지</h4>
      <EmojiPicker {...args} />
      <h4>배경색</h4>
      <Button backgroundColor="royalblue" />
      <h4>해시태그</h4>
      <Button backgroundColor="royalblue" />
    </>
  );
};
Default.argTypes = {
  disabled: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
  onChange: { action: 'onChange' },
};
