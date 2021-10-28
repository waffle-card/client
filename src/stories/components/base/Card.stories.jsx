import Card from '@components/base/Card';

export default {
  title: 'Component/Base/Card',
};

export const EmptyCard = args => {
  return <Card.Empty {...args} />;
};
EmptyCard.argTypes = {
  width: {
    defaultValue: `265px`,
    control: 'text',
  },
  backgroundColor: {
    control: 'color',
  },
  onClick: { action: 'onClick' },
};

export const FilledCard = args => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Card width="265px" backgroundColor="blue" {...args} />
      <Card width="265px" backgroundColor="red" {...args} />
      <Card width="265px" backgroundColor="royalblue" {...args} />
    </div>
  );
};
