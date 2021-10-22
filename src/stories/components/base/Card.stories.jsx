import Card from '@components/base/Card';
import Icons from '@components/base/Icons';

export default {
  title: 'Component/Card',
  component: { Card, Icons },
  argTypes: {
    width: {
      defaultValue: '265px',
      control: 'number',
    },
    height: {
      defaultValue: '400px',
      control: 'number',
    },
    backgroundColor: {
      control: 'color',
    },
    onClick: { action: 'onClick' },
  },
};

export const EmptyCard = args => {
  return (
    <Card width="265px" height="400px" {...args}>
      <Icons backgroundColor="none">
        <Icons.Add fontSize="50px" color="black" />
      </Icons>
    </Card>
  );
};

export const FilledCard = args => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Card width="265px" height="400px" backgroundColor="blue" {...args} />
      <Card width="265px" height="400px" backgroundColor="red" {...args} />
      <Card
        width="265px"
        height="400px"
        backgroundColor="royalblue"
        {...args}
      />
    </div>
  );
};
