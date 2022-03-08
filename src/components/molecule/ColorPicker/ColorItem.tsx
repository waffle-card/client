import React from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';

export interface ColorItemProps extends React.ComponentProps<'label'> {
  color?: string;
}

const ColorItem = ({
  color = Common.colors.yellow,
  ...props
}: ColorItemProps) => {
  return (
    <Container {...props}>
      <ColorInput type="radio" name="color" id={color} value={color} />
      <ColorBox color={color} />
    </Container>
  );
};

const Container = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin: 4px;
`;

const ColorBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  padding: 4px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.6;
  }
`;

const ColorInput = styled.input`
  display: none;

  &:checked + div {
    border: 3px solid white;
  }
`;

export default ColorItem;
