import {
  Button,
  CardEditForm,
  MultipleInput,
  EmojiPickerActiveButton,
} from '@components';

export default {
  title: 'Component/Domain/CardEditForm',
};

export const Default = () => {
  return <CardEditForm />;
};

export const Inputs = args => {
  return <MultipleInput {...args} />;
};
Inputs.argTypes = {
  onChange: { action: 'onChange' },
};

export const PickerButton = args => {
  return (
    <>
      <h4>이모지</h4>
      <EmojiPickerActiveButton {...args} />
      <h4>배경색</h4>
      <Button backgroundColor="royalblue" />
      <h4>해시태그</h4>
      <Button backgroundColor="royalblue" />
    </>
  );
};
PickerButton.argTypes = {
  disabled: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
  onChange: { action: 'onChange' },
};
