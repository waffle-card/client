import Icon from '@material-ui/core/Icon';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

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
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(
    e => {
      onClick && onClick(e);
    },
    [onClick],
  );

  return (
    <Anchor href={href}>
      <Icon
        style={{ ...iconStyle, ...props.style }}
        onClick={handleClick}
        {...props}>
        arrow_back_ios
      </Icon>
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
