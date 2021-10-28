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
`;

const HashTagInput = ({ color, onChange, ...props }) => {
  const [values, setValue] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
  });

  const { first, second, third, fourth, fifth } = values;

  const handleChange = e => {
    const { name, value } = e.target;
    setValue(values => {
      return { ...values, [name]: value };
    });
    const result = Object.values(values).filter(value => value !== '');
    onChange && onChange(result);
  };

  return (
    <InputContainer {...props}>
      <Input name="first" onChange={handleChange} value={first} color={color} />
      <Input
        name="second"
        onChange={handleChange}
        value={second}
        color={color}
      />
      <Input name="third" onChange={handleChange} value={third} color={color} />
      <Input
        name="fourth"
        onChange={handleChange}
        value={fourth}
        color={color}
      />
      <Input name="fifth" onChange={handleChange} value={fifth} color={color} />
    </InputContainer>
  );
};

export default HashTagInput;
