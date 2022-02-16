import React from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';
import PropTypes from 'prop-types';

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

const ColorItem = ({ color, name, ...props }) => {
  return (
    <Container {...props}>
      <ColorInput type="radio" name={name} id={color} value={color} />
      <ColorBox color={color} />
    </Container>
  );
};

ColorItem.defaultProps = {
  color: Common.colors.yellow,
  name: 'color',
};

ColorItem.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
};

export default ColorItem;
