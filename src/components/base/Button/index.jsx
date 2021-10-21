import styled from '@emotion/styled';

const Button = styled.button`
  box-sizing: border-box;
  display: block;
  width: 550px;
  height: 56px;
  padding: 8px 6px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  background-color: #ffd039;
  border: none;
  border-radius: 16px;
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    border: solid 1px white;
  }

  &:disabled {
    background-color: #888;
  }
`;

export default Button;
