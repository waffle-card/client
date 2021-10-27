import Text from '@components/base/Text';

export default {
  title: 'Component/Base/Text',
  component: Text,
  argTypes: {
    block: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    size: { control: 'number' },
    weight: { control: 'number' },
    underline: { control: 'boolean' },
    del: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export const Default = args => {
  return (
    <>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
    </>
  );
};
