import Tab from '@components/domain/Tab';
import Common from '@styles';

export default {
  title: 'Component/Tab',
  component: Tab,
  argTypes: {
    backgroundColor: {
      defaultValue: Common.colors.background_menu,
      control: { type: 'color' },
    },
    height: {
      defaultValue: 47,
      control: { type: 'number' },
    },
    pointColor: {
      defaultValue: Common.colors.primary,
      control: { type: 'color' },
    },
    shadowStyle: {
      defaultValue: Common.shadow.menu,
      control: { type: 'text' },
    },
    fontSize: {
      defaultValue: Common.fontSize.medium,
      control: { type: 'number' },
    },
  },
};

export const Default = args => {
  return (
    <Tab {...args}>
      <Tab.Item title="오늘의 카드" index="0"></Tab.Item>
      <Tab.Item title="나의 카드" index="1"></Tab.Item>
      <Tab.Item title="즐겨찾기" index="2"></Tab.Item>
    </Tab>
  );
};
