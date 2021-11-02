import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icons } from '@components';
import Common from '@styles';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
  opacity: 0.8;

  @media ${Common.media.sm} {
    width: 40px;
    height: 20px;
  }
  @media ${Common.media.md} {
    width: 50px;
    height: 25px;
  }
  @media ${Common.media.lg} {
    width: 60px;
    height: 30px;
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
  const history = useHistory();
  const handleClickEditIcon = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      history.push(`/card/update:${cardId}`);
      onEditIconClick && onEditIconClick(e);
    },
    [onEditIconClick, history, cardId],
  );

  const handleClickDeleteIcon = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onDeleteIconClick && onDeleteIconClick(e);
    },
    [onDeleteIconClick],
  );

  return (
    <Container
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      {...props}>
      <Icons>
        <Icons.Edit color={fontColor} href="#" onClick={handleClickEditIcon} />
      </Icons>
      <Icons>
        <Icons.Delete
          color={fontColor}
          href="#"
          onClick={handleClickDeleteIcon}
        />
      </Icons>
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
