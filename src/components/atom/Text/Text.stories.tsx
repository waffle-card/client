import { Text, TextProps } from '@/components';

export default {
  title: 'Component/Atom/Text',
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

export const Default = (args: TextProps): JSX.Element => {
  return (
    <>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
    </>
  );
};
