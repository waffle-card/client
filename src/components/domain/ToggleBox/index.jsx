import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { Icons, Text } from '@components';
import React, { useCallback, useState } from 'react';
import { useUser } from '@contexts';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';
import axios from 'axios';

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

axios.defaults.baseURL = 'http://13.209.30.200';

const Authorization = async (url, method, data) => {
  const tokenId = JSON.parse(sessionStorage.getItem('WAFFLE_TOKEN'));
  return await axios({
    url,
    method,
    headers: { Authorization: `Bearer ${tokenId}` },
    data: data,
  })
    .then(res => res.data)
    .catch(e => console.error(e));
};

const ToggleBox = ({
  cardInfo,
  onClickLikeIcon,
  likeCount: initLikeCount = 0,
  ...props
}) => {
  const { userInfo } = useUser();
  const [likeCount, setLikeCount] = useState(cardInfo.likes.length);

  const handleClickLikeIcon = useCallback(
    async (e, likeToggled) => {
      e.stopPropagation();
      if (!userInfo) {
        Swal.fire({
          title: '🥲 Oops!',
          text: '좋아요는 로그인 이후에 가능합니다.',
          confirmButtonColor: Common.colors.point,
        });
        return;
      }
      try {
        if (!likeToggled) {
          await Authorization('likes/create', 'POST', {
            postId: cardInfo.id,
          });
          setLikeCount(cnt => cnt + 1);
        } else {
          const likeId = cardInfo.likes.find(
            like => like.user === userInfo.id,
          )?._id;

          if (likeId) {
            await cardApi.deleteCardLike(likeId);
          }
          setLikeCount(cnt => cnt - 1);
        }
      } catch (error) {
        Swal.fire({
          title: '🥲 Oops!',
          text: error,
          confirmButtonColor: Common.colors.point,
        });
      }
      onClickLikeIcon && onClickLikeIcon(e);
    },
    [onClickLikeIcon, userInfo, cardInfo],
  );

  return (
    <IconWrapper {...props}>
      <Icons fontSize={'20px'}>
        <Icons.Like
          active={
            userInfo && cardInfo.likes?.find(like => like.user === userInfo.id)
              ? true
              : false
          }
          onClick={handleClickLikeIcon}
        />
      </Icons>
      <StyledText block>{likeCount}</StyledText>
    </IconWrapper>
  );
};

ToggleBox.protoTypes = {
  onClickLikeIcon: PropTypes.func,
  onClickBookmarkIcon: PropTypes.func,
  likeToggle: PropTypes.bool,
  likeCount: PropTypes.number,
  bookmarkToggle: PropTypes.bool,
  bookmarkCount: PropTypes.number,
};

export default ToggleBox;
