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

const ColorPicker = ({ colors, name, onChange, ...props }) => {
  const pureColors = useMemo(() => [...new Set(colors)], [colors]);

  const handleChange = useCallback(
    e => {
      const color = e.target.value;
      onChange && onChange(color);
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

ColorPicker.defaultProps = {
  colors: Object.values(Common.colors).slice(1, 13),
  name: 'color',
};

ColorPicker.propTypes = {
  colors: PropTypes.array,
  name: PropTypes.string,
};

ColorPicker.ColorItem = ColorItem;

export default ColorPicker;
