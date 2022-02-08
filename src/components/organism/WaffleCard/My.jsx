import React from 'react';
import PropTypes from 'prop-types';
import { EditBox } from '@components';
import BasicWaffleCard from './Basic';
import styled from '@emotion/styled';
import { useHover } from '@hooks';

const MyWaffleCard = ({ onClickEdit, onClickDelete, ...props }) => {
  const [ref, isHovered] = useHover();
  const { waffleCardData, onClickWaffleCard, onClickLike, likeToggled } = props;

  const handleClickEdit = () => {
    onClickEdit && onClickEdit(waffleCardData.id);
  };

  const handleClickDelete = () => {
    onClickDelete && onClickDelete(waffleCardData.id);
  };

  return (
    <Container ref={ref} {...props}>
      {isHovered && (
        <StyledEditBox
          onClickUpdate={handleClickEdit}
          onClickDelete={handleClickDelete}
        />
      )}
      <BasicWaffleCard
        waffleCardData={waffleCardData}
        onClickWaffleCard={onClickWaffleCard}
        onClickLike={onClickLike}
        likeToggled={likeToggled}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledEditBox = styled(EditBox)`
  position: absolute;
  top: -1rem;
  z-index: 2;
`;

MyWaffleCard.propTypes = {
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default MyWaffleCard;
