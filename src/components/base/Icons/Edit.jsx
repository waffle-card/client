import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Edit = ({ fontSize, color, href }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Edit Icon Clicked!');
  }, []);

  return (
    <Anchor href={href}>
      <Icon style={{ ...iconStyle }} onClick={handleClick}>
        edit
      </Icon>
    </Anchor>
  );
};

Edit.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default Edit;
