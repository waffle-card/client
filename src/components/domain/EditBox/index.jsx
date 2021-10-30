import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icons } from '@components';
import { useHover } from '@hooks';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 62px;
  height: 29px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
  opacity: 0.8;

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & a:nth-of-type(1) {
    margin-right: 4px;
  }
`;

const EditBox = ({ cardId, backgroundColor, fontColor, onHover, ...props }) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      {...props}>
      <Icons.Edit
        fontSize="1.25rem"
        color={fontColor}
        href={`/card/${cardId}/update`}
      />
      <Icons.Delete fontSize="1.25rem" color={fontColor} href="/" />
    </Container>
  );
};

EditBox.propTypes = {
  cardId: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
};

EditBox.defaultProps = {
  backgroundColor: '#3E4857',
};

export default EditBox;
