import { useState } from 'react';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';

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
      <Icons.Favorite
        style={{
          fontSize: '32px',
          color: 'white',
          marginRight: '5px',
        }}
        onClick={handleFavoriteClick}></Icons.Favorite>
      <Text
        style={{
          color: 'white',
          marginRight: '5px',
          paddingTop: '3px',
        }}>
        {favoriteCount}
      </Text>
    </>
  );
};

export default Favorite;
