import React, { useCallback } from 'react';
import * as S from './EditBox.style';

interface EditBoxProps extends React.ComponentProps<'div'> {
  backgroundColor?: string;
  fontColor?: string;
  onClickUpdate?: (e: React.MouseEvent) => void;
  onClickDelete?: (e: React.MouseEvent) => void;
}

const EditBox = ({
  backgroundColor,
  fontColor,
  onClickUpdate,
  onClickDelete,
  ...props
}: EditBoxProps) => {
  const handleClickEditIcon = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onClickUpdate && onClickUpdate(e);
    },
    [onClickUpdate],
  );

  const handleClickDeleteIcon = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onClickDelete && onClickDelete(e);
    },
    [onClickDelete],
  );

  return (
    <S.Container {...props}>
      <S.EditIcon onClick={handleClickEditIcon} />
      <S.DeleteIcon onClick={handleClickDeleteIcon} />
    </S.Container>
  );
};

export default React.memo(EditBox);
