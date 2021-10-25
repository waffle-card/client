import Text from '@components/base/Text';

export default {
  title: 'Example/Text',
  component: Text,
  argTypes: {
    block: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    size: { control: 'number' },
    weight: { control: 'number' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export const Template = args => {
  return (
    <>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
    </>
  );
};
