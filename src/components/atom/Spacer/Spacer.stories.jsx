import { Spacer } from '@components';
import { Button } from '@components';

export default {
  title: 'Component/Base/Spacer',
  component: Spacer,
};

export const Horizontal = args => {
  const buttonStyle = {
    width: 200,
    height: 50,
    backgroundColor: 'royalblue',
    fontSize: '16px',
    fontColor: 'white',
  };
  return (
    <Spacer {...args}>
      <Button style={{ ...buttonStyle, display: 'inline-block' }}>버튼</Button>
      <Button style={{ ...buttonStyle, display: 'inline-block' }}>버튼</Button>
      <Button style={{ ...buttonStyle, display: 'inline-block' }}>버튼</Button>
    </Spacer>
  );
};

export const Vertical = args => {
  const buttonStyle = {
    width: 200,
    height: 50,
    backgroundColor: 'royalblue',
    fontSize: '16px',
    fontColor: 'white',
  };
  return (
    <Spacer {...args} type="vertical" size={32}>
      <Button style={{ ...buttonStyle }}>버튼</Button>
      <Button style={{ ...buttonStyle }}>버튼</Button>
      <Button style={{ ...buttonStyle }}>버튼</Button>
    </Spacer>
  );
};
