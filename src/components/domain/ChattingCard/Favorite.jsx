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

const Favorite = () => {
  const getFavoriteCount = 0;
  const [favoriteCount, setFavoriteCount] = useState(getFavoriteCount);
  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = () => {
    if (favorite) {
      setFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    } else {
      setFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    }
  };

  return (
    <>
      <Icons.Favorite onClick={handleFavoriteClick}></Icons.Favorite>
      <StyleText block>{favoriteCount}</StyleText>
    </>
  );
};

export default Favorite;
