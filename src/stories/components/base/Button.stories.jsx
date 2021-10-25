import { Button } from '@components';

export default {
  title: 'Component/Base/Button',
  component: Button,
};

export const Default = () => {
  return (
    <>
      <Button>가입하기</Button>
      <br />
      <Button>입장하기</Button>
    </>
  );
};

export const Custom = args => {
  return (
    <>
      <Button {...args}>가입하기</Button>
      <br />
      <Button {...args}>입장하기</Button>
    </>
  );
};
Custom.argTypes = {
  width: {
    defaultValue: 300,
    control: { type: 'number' },
  },
  height: {
    defaultValue: 44,
    control: { type: 'number' },
  },
  fontColor: {
    defaultValue: 'white',
    control: { type: 'color' },
  },
  backgroundColor: {
    defaultValue: 'royalblue',
    control: { type: 'color' },
  },
  fontSize: {
    defaultValue: 12,
    control: { type: 'number' },
  },
  onClick: { action: 'onClick' },
};

export const Usage = () => {
  const buttonOptions = {
    fontColor: 'white',
    backgroundColor: '#FFD039',
    width: 300,
    height: '42px',
    fontSize: 12,
  };
  return (
    <>
      <Button {...buttonOptions}>구조분해 버튼</Button>
      <br />
      <Button
        width={'400px'}
        height={56}
        fontColor={'#FFD039'}
        backgroundColor={'royalblue'}
        fontSize={'22px'}>
        속성지정 버튼
      </Button>
    </>
  );
};
