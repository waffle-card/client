import { Tab } from '@/components';
import { TAB_MENU } from '@/constants';

export default {
  title: 'Component/molecule/Tab',
  component: Tab,
};

export const Default = () => {
  return <Tab currentActive={TAB_MENU[0].name}></Tab>;
};
