import { useState } from 'react';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';

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
      <Icons.Like
        style={{
          fontSize: '32px',
          color: 'white',
          marginRight: '5px',
        }}
        onClick={handleLikeClick}></Icons.Like>
      <Text
        style={{
          color: 'white',
          marginRight: '5px',
          paddingTop: '3px',
        }}>
        {likeCount}
      </Text>
    </>
  );
};

export default Like;
