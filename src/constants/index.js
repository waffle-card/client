import {
  chatting,
  clickMyCardTab,
  createCard,
  viewLikeCards,
  viewTotalCards,
} from '@assets';

export const TAB_MENU = {
  total: '오늘의 카드',
  my: '나의 카드',
  like: '관심 카드',
};

export const GUIDE_SLIDE_DATA = {
  viewTotalCards: {
    text: '흥미로운 해시태그와 아이콘을 가진 카드를 클릭해보세요!',
    url: viewTotalCards,
  },
  chatting: {
    text: '같은 관심사를 가진 사람들과 익명으로 대화할 수 있습니다',
    url: chatting,
  },
  clickMyCardTab: {
    text: '카드를 생성하고 싶다면 로그인 후 나의 카드 탭으로 가주세요!',
    url: clickMyCardTab,
  },
  createCard: {
    text: '이모티콘과 배경색을 설정하고 해시태그를 적어 나만의 와플카드를 생성하세요!',
    url: createCard,
  },
  viewLikeCards: {
    text: '좋아요를 누른 카드는 관심카드 탭에서 모아볼 수 있습니다',
    url: viewLikeCards,
  },
};
