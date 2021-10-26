import styled from '@emotion/styled';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@components';
import Common from '@styles';
import Picker from 'emoji-picker-react';
import PropTypes from 'prop-types';

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

const EmojiInput = styled.input`
  display: none;
`;

const EmojiPicker = ({ disabled, onChange, ...props }) => {
  const [showEmojiPicker, togglePicker] = useState(() => false);
  const ref = useRef();
  const toggleEmojiPicker = () => togglePicker(prev => !prev);

  const handleEmojiClick = useCallback(
    (_, emojiObject) => {
      ref.current.value = emojiObject.emoji;
      onChange && onChange(emojiObject.emoji);
      toggleEmojiPicker();
    },
    [onChange],
  );

  return (
    <Container for="emoji" {...props}>
      <Button
        width={88}
        height={40}
        fontSize={Common.fontSize.small}
        disabled={disabled}
        onClick={toggleEmojiPicker}>
        선택
      </Button>
      <EmojiInput type="text" id="emoji" name="emoji" ref={ref} />
      {showEmojiPicker && (
        <PickerWrapper>
          <Picker onEmojiClick={handleEmojiClick} />
        </PickerWrapper>
      )}
    </Container>
  );
};

EmojiPicker.protoTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

EmojiPicker.defaultProps = {
  disabled: false,
};

export default EmojiPicker;
