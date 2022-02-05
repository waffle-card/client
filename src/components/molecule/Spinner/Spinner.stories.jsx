import { Spinner } from '@components';
import Common from '@styles';
import { useState } from 'react';

export default {
  title: 'Component/Base/Spinner',
};

export const Default = args => {
  return <Spinner loading {...args} />;
};
Default.argTypes = {
  loading: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
  size: {
    defaultValue: 50,
    control: { type: 'number' },
  },
  color: {
    defaultValue: Common.colors.point,
    control: { type: 'text' },
  },
};

export const Usage = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <button onClick={handleClick}>이것은 버튼</button>
      <h1>이것은 헤더</h1>
      <Spinner loading={loading} />
    </>
  );
};
