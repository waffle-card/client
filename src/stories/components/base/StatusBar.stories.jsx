import StatusBar from '@components/base/StatusBar';

export default {
  title: 'Component/base/StatusBar',
  component: StatusBar,
  argTypes: {
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    percent: {
      control: { type: 'number' },
    },
    radius: {
      control: { type: 'number' },
    },
  },
};

export const Default = args => {
  return <StatusBar {...args}></StatusBar>;
};
