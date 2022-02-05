import { authApi } from '@apis';

export const parseCardInfo = cardData => {
  const { cardColor: color = '', hashTags = [] } = JSON.parse(cardData.meta);
  return {
    id: cardData._id,
    userName: cardData.author.fullName,
    emoji: cardData.title,
    color,
    hashTags,
    createdAt: cardData.createdAt,
    updatedAt: cardData.updatedAt,
    comments: cardData.comments,
    likes: cardData.likes,
  };
};

export const parseUserInfo = userData => {
  const { likeCardList = [], bookmarkCardList = [] } = JSON.parse(
    userData.meta,
  );
  return {
    id: userData._id,
    userName: userData.fullName,
    email: userData.email,
    likeCardList,
    bookmarkCardList,
  };
};

export const getUserInfoByToken = async () => {
  const response = await authApi.getAuthUser();
  if (!response.data) {
    return null;
  }
  if (response.data._id) {
    return parseUserInfo(response.data);
  }
};
