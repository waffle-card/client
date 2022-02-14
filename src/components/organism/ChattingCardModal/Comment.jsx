import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Common from '@styles';
import { EditBox } from '@components';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useHover } from '@hooks';

const getLongestLineLength = paragraph => {
  let longestLineLength = 0;
  const lines = paragraph.split('\n');

  lines.forEach(line => {
    if (line.length > longestLineLength) {
      longestLineLength = line.length;
    }
  });

  return longestLineLength;
};

const Comment = ({
  type,
  commentData,
  onClickEdit,
  onClickDelete,
  ...props
}) => {
  const [containerRef, hover] = useHover();
  const textAreaRef = useRef();

  const handleClickUpdate = e => {
    if (type !== 'edit') return;
    onClickEdit && onClickEdit(commentData.id, commentData.text);
  };

  const handleClickDelete = e => {
    if (type !== 'edit') return;
    onClickDelete && onClickDelete(commentData.id);
  };

  useEffect(() => {
    const width = getLongestLineLength(textAreaRef.current.value);
    containerRef.current.style.width = width * 16 + 'px';
  }, [containerRef, textAreaRef]);

  return (
    <Container ref={containerRef} {...props}>
      {type === 'edit' && hover && (
        <StyledEditBox
          onClickUpdate={handleClickUpdate}
          onClickDelete={handleClickDelete}
        />
      )}
      <TextArea
        ref={textAreaRef}
        readOnly
        col={'400px'}
        value={`${commentData.user.name} : ${commentData.text}`}
      />
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  position: relative;
  max-width: 70%;
  min-width: 30%;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${Common.colors.speech_bubble};
  color: ${Common.colors.primary};
  outline: none;
  border: none;
  resize: none;

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

const StyledEditBox = styled(EditBox)`
  position: absolute;
  top: 0px;
  right: 0px;
`;

Comment.propTypes = {
  type: PropTypes.string,
  commentData: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

Comment.defaultProps = {
  type: 'basic',
  commentData: {},
};

export default Comment;
