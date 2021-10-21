// import React from 'react';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';

const Button = styled.button`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 40px;
  padding: 8px 6px;
  color: white;
  cursor: pointer;
  background-color: black;
  border: none;
  border-radius: 4px;
  outline: none;

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #222;
  }

  &:disabled {
    background-color: #888;
  }
`;

export default Button;
