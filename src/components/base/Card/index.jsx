import styled from '@emotion/styled';

const CardStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) =>
    typeof width === 'number' ? `${width - 10}px` : `calc(${width} - 10px)`};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height - 10}px` : `calc(${height} - 10px)`};
  border: ${({ backgroundColor, color }) =>
    backgroundColor ? undefined : `5px dashed ${color ? color : 'black'}`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'transparent'};
  border-radius: 16px;
  margin: 8px;
  padding: ${({ backgroundColor }) => (backgroundColor ? '5px' : undefined)};
`;

const Card = ({
  children,
  width,
  height,
  color,
  backgroundColor,
  href,
  ...props
}) => {
  return (
    <CardStyle
      width={width}
      height={height}
      color={(backgroundColor, color)}
      backgroundColor={backgroundColor}>
      {children}
    </CardStyle>
  );
};

export default Card;
