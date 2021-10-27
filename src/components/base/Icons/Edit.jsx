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

const Edit = ({
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
        edit
      </Icon>
    </Anchor>
  );
};

Edit.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default Edit;
