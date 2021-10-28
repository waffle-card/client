import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import { useForm } from '@hooks';

const InputContainer = styled.form`
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
  padding: 6px, 8px;
  width: 114px;
  height: 40px;
  font-size: 14px;
  color: black;
  border-radius: 4px;
  border: 2px solid black;
  background-color: transparent;
  box-sizing: border-box;
`;

const HashTagInput = ({ onChange, ...props }) => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValue: {
      first: '',
      second: '',
    },
    onSubmit: async values => {
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors = {};
      if (!email) errors.email = '이메일을 입력해주세요';
      return errors;
    },
  });
  console.log('렌더링');

  return (
    <InputContainer {...props} onSubmit={handleSubmit}>
      <Input name="first" onChange={handleChange} />
      <Input name="second" onChange={handleChange} />
      {/* <Input name="third" onChange={handleChange} />
      <Input name="fourth" onChange={handleChange} />
      <Input name="fifth" onChange={handleChange} /> */}
      <button type="submit">제출</button>
    </InputContainer>
  );
};

export default HashTagInput;
