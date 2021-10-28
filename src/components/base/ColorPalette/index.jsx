import React, { useCallback, useMemo } from 'react';
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

const ColorPalette = ({ colors, name, onChange, ...props }) => {
  const pureColors = useMemo(() => [...new Set(colors)], [colors]);

  const handleChange = useCallback(
    e => {
      onChange && onChange(e);
    },
    [onChange],
  );

  return (
    <Container {...props}>
      {pureColors.map(color => (
        <ColorItem
          color={color}
          name={name}
          key={color}
          onChange={handleChange}
        />
      ))}
    </Container>
  );
};

ColorPalette.defaultProps = {
  colors: Object.values(Common.colors).slice(1, 13),
  name: 'color',
};

ColorPalette.propTypes = {
  colors: PropTypes.array,
  name: PropTypes.string,
};

ColorPalette.ColorItem = ColorItem;

export default ColorPalette;
