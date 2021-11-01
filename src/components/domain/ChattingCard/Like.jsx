import { useState } from 'react';
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

const Like = () => {
  const getLikeCount = 0;
  const [likeCount, setLikeCount] = useState(getLikeCount);
  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    if (like) {
      setLike(false);
      setLikeCount(likeCount - 1);
    } else {
      setLike(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <>
      <Icons.Like onClick={handleLikeClick}></Icons.Like>
      <StyleText block>{likeCount}</StyleText>
    </>
  );
};

export default Like;
