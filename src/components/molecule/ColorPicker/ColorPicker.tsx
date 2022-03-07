import React, { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';
import ColorItem from './ColorItem';

export interface ColorPickerProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  colors?: string[];
  onChange?: (color: string) => void;
}

const ColorPicker = ({
  colors = Object.values(Common.colors).slice(1, 13),
  onChange,
  ...props
}: ColorPickerProps) => {
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
        <ColorItem color={color} key={color} onChange={handleChange} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(6, 1fr);
  min-width: 200px;
  max-width: 400px;
`;

ColorPicker.ColorItem = ColorItem;

export default ColorPicker;
