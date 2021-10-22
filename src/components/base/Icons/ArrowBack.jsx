import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const ArrowBack = ({ fontSize, color, href, onClick }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('ArrowBack Icon Clicked!');
  }, []);

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
};

export default ArrowBack;
