import Button from '@components/base/Button';

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    size: {
      name: 'size',
      defaultValue: 'small',
      options: ['small', 'large'],
      control: { type: 'inline-radio' },
    },
    color: {
      name: 'color',
      defaultValue: 'yellow',
      options: ['yellow', 'white'],
      control: { type: 'inline-radio' },
    },
    onClick: { action: 'onClick' },
  },
};

export const Default = args => {
  return (
    <>
      <Button {...args}>가입하기</Button>
      <br />
      <Button {...args}>입장하기</Button>
    </>
  );
};
