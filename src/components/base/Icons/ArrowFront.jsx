import Icon from '@material-ui/core/Icon';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const StyleIcon = styled(Icon)`
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : { fontSize }};
  color: ${({ color }) => color};
`;

const Anchor = styled.a`
  display: flex;
  justify-content: center;
  color: inherit;
  text-decoration: none;
`;

const ArrowBack = ({
  fontSize = '24px',
  color = 'white',
  href,
  onClick,
  ...props
}) => {
  const handleClick = useCallback(
    e => {
      onClick && onClick(e);
    },
    [onClick],
  );

  return (
    <Anchor href={href}>
      <StyleIcon
        fontSize={fontSize}
        color={color}
        style={{ ...props.style }}
        onClick={handleClick}
        {...props}>
        arrow_forward_ios
      </StyleIcon>
    </Anchor>
  );
};

ArrowBack.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default ArrowBack;
