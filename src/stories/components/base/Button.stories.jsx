import Button from '@components/base/Button';

export default {
  title: 'Component/Base/Button',
  component: Button,
  argTypes: {
    width: {
      defaultValue: 550,
      control: { type: 'number' },
    },
    height: {
      defaultValue: 56,
      control: { type: 'number' },
    },
    fontColor: {
      defaultValue: 'white',
      control: { type: 'color' },
    },
    backgroundColor: {
      defaultValue: '#FFD039',
      control: { type: 'color' },
    },
    fontSize: {
      defaultValue: 18,
      control: { type: 'number' },
    },
    onClick: { action: 'onClick' },
  },
};

export const Default = args => {
  return (
    <>
      <Button {...args}>가입하기</Button>
      <br />
      <Button {...args}>입장하기</Button>
    </>
  );
};

export const Test = () => {
  const buttonOptions = {
    fontColor: 'white',
    backgroundColor: '#FFD039',
    width: 300,
    height: 32,
    fontSize: 12,
  };
  return (
    <>
      <Button {...buttonOptions}>구조분해 버튼</Button>
      <br />
      <Button
        width={400}
        height={32}
        fontColor={'#FFD039'}
        backgroundColor={'royalblue'}
        fontSize={18}>
        속성지정 버튼
      </Button>
    </>
  );
};
