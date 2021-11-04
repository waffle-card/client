import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icons } from '@components';
import Common from '@styles';

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
  backgroundColor,
  fontColor,
  onEditIconClick,
  onDeleteIconClick,
  ...props
}) => {
  const handleClickEditIcon = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onEditIconClick && onEditIconClick(e);
    },
    [onEditIconClick],
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
      <Icons fontSize="15px">
        <Icons.Edit color={fontColor} href="#" onClick={handleClickEditIcon} />
      </Icons>
      <Icons fontSize="15px">
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
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
};

EditBox.defaultProps = {
  backgroundColor: '#3E4857',
};

export default React.memo(EditBox);
