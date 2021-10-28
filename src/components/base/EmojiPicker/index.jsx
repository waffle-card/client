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

const EmojiPicker = ({ disabled, id, name, type, onEmojiClick, ...props }) => {
  const [showEmojiPicker, togglePicker] = useState(() => false);
  const ref = useRef();
  const toggleEmojiPicker = () => togglePicker(prev => !prev);

  const handleEmojiClick = useCallback(
    (e, emojiObject) => {
      console.log('이모지피커', e);
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
      <EmojiInput type="text" id={id} name={name} ref={ref} />
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
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

EmojiPicker.defaultProps = {
  disabled: false,
  id: 'emoji',
  name: 'emoji',
};

export default EmojiPicker;
