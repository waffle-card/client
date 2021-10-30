import React, { useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';

const InputContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
  @media ${Common.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Input = styled.input`
  display: block;
  padding: 0 8px;
  width: 114px;
  height: 40px;
  font-size: 14px;
  color: ${({ color }) => color};
  border-radius: 4px;
  border: 2px solid ${({ color }) => color};
  background-color: transparent;
  box-sizing: border-box;
  @media ${Common.media.sm} {
    width: 140px;
  }
`;

const HashTagInput = React.memo(({ color, onChange, ...props }) => {
  const [values, setValue] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValue(newValues);
    const result = Object.values(newValues).filter(value => value !== '');
    onChange && onChange(result);
  };

  return (
    <InputContainer {...props}>
      <Input name="first" onChange={handleChange} color={color} />
      <Input name="second" onChange={handleChange} color={color} />
      <Input name="third" onChange={handleChange} color={color} />
      <Input name="fourth" onChange={handleChange} color={color} />
      <Input name="fifth" onChange={handleChange} color={color} />
    </InputContainer>
  );
});

export default HashTagInput;
