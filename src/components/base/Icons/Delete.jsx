import styled from '@emotion/styled';
import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Delete = ({ fontSize, color, href, onClick }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Delete Icon Clicked!');
  }, []);

  return (
    <Anchor href={href}>
      <Icon style={{ ...iconStyle }} onClick={handleClick}>
        clear
      </Icon>
    </Anchor>
  );
};

Delete.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default Delete;
