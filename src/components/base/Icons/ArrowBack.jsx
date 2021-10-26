import Icon from '@material-ui/core/Icon';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const ArrowBack = ({ fontSize = '24px', color = 'white', href, onClick }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('ArrowBack Icon Clicked!');
    onClick && onClick();
  }, [onClick]);

  return (
    <Anchor href={href}>
      <Icon style={{ ...iconStyle }} onClick={handleClick}>
        arrow_back_ios
      </Icon>
    </Anchor>
  );
};

ArrowBack.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default ArrowBack;
