import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const EmojiPicker = ({ disabled, id, name, type, onChange, ...props }) => {
  const [showEmojiPicker, togglePicker] = useState(() => false);
  const ref = useRef();
  const toggleEmojiPicker = () => togglePicker(prev => !prev);

  console.log('렌더링!!!!');

  const handleEmojiClick = useCallback((e, emojiObject) => {
    ref.current.value = emojiObject.emoji;
    // toggleEmojiPicker();
    console.log(ref.current);
    const $input = document.querySelector(`input[name="${id}"]`);
    console.log($input);
    // ref.current.dispatchEvent(new Event('onChange'));
    $input.dispatchEvent(new Event('onChange'));
  }, []);

  const handleChange = useCallback(
    e => {
      console.log('이모지피커', e);
      onChange && onChange(e);
    },
    [onChange],
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
      <EmojiInput
        type="text"
        id={id}
        name={name}
        ref={ref}
        onChange={handleChange}
      />
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
