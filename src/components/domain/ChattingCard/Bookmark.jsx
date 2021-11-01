import { useState } from 'react';
import React from 'react';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';
import styled from '@emotion/styled';
import Common from '@styles';

const StyleText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
    padding-top: 0;
    margin-left: 2px;
    margin-right: 2px;
  }

  @media ${Common.media.md} {
    font-size: ${Common.fontSize.md};
    padding-top: 0;
    margin-left: 3px;
    margin-right: 3px;
  }

  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.lg};
    padding-top: 3px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const Bookmark = () => {
  const getBookmarkCount = 0;
  const [bookmarkCount, setBookmarkCount] = useState(getBookmarkCount);
  const [bookmark, setBookmark] = useState(false);

  const handleBookmarkClick = () => {
    if (bookmark) {
      setBookmark(false);
      setBookmarkCount(bookmarkCount - 1);
    } else {
      setBookmark(true);
      setBookmarkCount(bookmarkCount + 1);
    }
  };

  return (
    <>
      <Icons.Bookmark onClick={handleBookmarkClick}></Icons.Bookmark>
      <StyleText block>{bookmarkCount}</StyleText>
    </>
  );
};

export default Bookmark;
