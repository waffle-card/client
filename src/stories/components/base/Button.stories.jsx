import Button from '@components/base/Button';

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export const Default = args => <Button {...args}>Button</Button>;
