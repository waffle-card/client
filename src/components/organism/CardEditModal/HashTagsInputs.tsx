import React, { useState } from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';

const HASHTAG: {
  [key: string]: string;
} = {
  0: 'first',
  1: 'second',
  2: 'third',
  3: 'fourth',
  4: 'fifth',
};

interface HashTagsInputsProps {
  color: string;
  onChange: (hashTags: string[]) => void;
  initHashTags: string[];
}

const HashTagsInputs = React.memo(
  ({ color, onChange, initHashTags = [], ...props }: HashTagsInputsProps) => {
    const [hashTagsMap, setHashTagsMap] = useState(() => {
      const obj: { [key: string]: string } = {};
      initHashTags.forEach((hashTag, index) => {
        obj[HASHTAG[index]] = hashTag;
      });
      return obj;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newHashTagsMap = { ...hashTagsMap, [name]: value };
      setHashTagsMap(newHashTagsMap);
      const hashTags = Object.values(newHashTagsMap).filter(
        value => value !== '',
      );
      onChange && onChange(hashTags);
    };

    return (
      <InputContainer {...props}>
        <Input
          name="first"
          onChange={handleChange}
          value={hashTagsMap.first ?? ''}
          color={color}
        />
        <Input
          name="second"
          onChange={handleChange}
          value={hashTagsMap.second ?? ''}
          color={color}
        />
        <Input
          name="third"
          onChange={handleChange}
          value={hashTagsMap.third ?? ''}
          color={color}
        />
        <Input
          name="fourth"
          onChange={handleChange}
          value={hashTagsMap.fourth ?? ''}
          color={color}
        />
        <Input
          name="fifth"
          onChange={handleChange}
          value={hashTagsMap.fifth ?? ''}
          color={color}
        />
      </InputContainer>
    );
  },
);

const InputContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
  @media ${Common.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Input = styled.input`
  display: block;
  padding: 0 8px;
  width: 114px;
  height: 40px;
  font-size: 14px;
  color: ${({ color }) => color};
  border-radius: 4px;
  border: 2px solid ${({ color }) => color};
  background-color: transparent;
  box-sizing: border-box;
  @media ${Common.media.sm} {
    width: 140px;
  }
`;

export default HashTagsInputs;
