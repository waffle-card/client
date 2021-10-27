import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icons } from '@components';

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

const EditBox = ({
  cardId,
  backgroundColor,
  fontColor,
  onEditIconClick,
  onDeleteIconClick,
  ...props
}) => {
  const handleClickEditIcon = useCallback(
    e => {
      e.preventDefault();
      console.log('edit icon', e);
      onEditIconClick && onEditIconClick(e);
    },
    [onEditIconClick],
  );

  const handleClickDeleteIcon = useCallback(
    e => {
      e.preventDefault();
      console.log('delete icon', e);
      onDeleteIconClick && onDeleteIconClick(e);
    },
    [onDeleteIconClick],
  );

  return (
    <Container
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      {...props}>
      <Icons.Edit
        fontSize="1.25rem"
        color={fontColor}
        href="#"
        onClick={handleClickEditIcon}
      />
      <Icons.Delete
        fontSize="1.25rem"
        color={fontColor}
        href="#"
        onClick={handleClickDeleteIcon}
      />
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
