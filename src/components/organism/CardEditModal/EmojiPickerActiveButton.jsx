import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Picker from 'emoji-picker-react';
import { Button } from '@components';
import Common from '@styles';

const Container = styled.label`
  display: inline-block;
  position: relative;
  margin: 0;
`;

const PickerWrapper = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  z-index: 2;
  animation: fadeIn 0.5s ease-in forwards;
`;

const EmojiPickerActiveButton = ({
  disabled,
  id,
  name,
  type,
  onEmojiClick,
  ...props
}) => {
  const [showEmojiPicker, togglePicker] = useState(() => false);
  const toggleEmojiPicker = () => togglePicker(prev => !prev);

  const handleEmojiClick = useCallback(
    (e, emojiObject) => {
      onEmojiClick && onEmojiClick(emojiObject.emoji);
      toggleEmojiPicker();
    },
    [onEmojiClick],
  );

  return (
    <Container htmlFor={id} {...props}>
      <Button
        type={type}
        width={88}
        height={40}
        fontSize={Common.fontSize.small}
        disabled={disabled}
        onClick={toggleEmojiPicker}>
        선택
      </Button>
      {showEmojiPicker && (
        <PickerWrapper>
          <Picker onEmojiClick={handleEmojiClick} />
        </PickerWrapper>
      )}
    </Container>
  );
};

EmojiPickerActiveButton.protoTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

EmojiPickerActiveButton.defaultProps = {
  disabled: false,
  id: 'emoji',
  name: 'emoji',
};

export default EmojiPickerActiveButton;
