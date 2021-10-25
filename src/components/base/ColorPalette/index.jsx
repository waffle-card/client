import React, { useCallback } from 'react';
import ColorItem from './ColorItem';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(6, 1fr);
  min-width: 200px;
  max-width: 400px;
`;

const ColorPalette = ({ colors, onChange, ...props }) => {
  const handleChange = useCallback(
    ({ target }) => {
      onChange && onChange(target.value);
    },
    [onChange],
  );

  return (
    <Container {...props}>
      {colors.map(color => (
        <ColorItem color={color} key={color} onChange={handleChange} />
      ))}
    </Container>
  );
};

ColorPalette.defaultProps = {
  colors: Object.values(Common.colors).slice(1, 13),
};

ColorPalette.propTypes = {
  colors: PropTypes.array,
};

ColorPalette.ColorItem = ColorItem;

export default ColorPalette;
