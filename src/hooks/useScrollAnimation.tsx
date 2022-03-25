import { useState, useEffect, useCallback } from 'react';
import { useInterval } from '@/hooks';

type ReturnTypes = [boolean, (on: boolean) => void, () => void, () => void];

const useScrollAnimation = (
  targetDom: HTMLElement | null,
  deps?: ('total' | 'my' | 'like' | undefined)[],
): ReturnTypes => {
  const [isPlayMove, setIsPlayMove] = useState(true);

  const moveScrollToFront = useCallback(() => {
    if (!(targetDom instanceof Element)) return;
    targetDom.scrollLeft = 0;
    setIsPlayMove(true);
  }, [targetDom]);

  const moveScrollToBack = useCallback(() => {
    if (!(targetDom instanceof Element)) return;
    targetDom.scrollLeft = targetDom.scrollWidth;
  }, [targetDom]);

  useInterval(
    () => {
      if (!(targetDom instanceof Element)) return;

      const { scrollLeft, clientWidth } = targetDom;
      const currentScrolledWidth = Math.ceil(scrollLeft + clientWidth);
      const isRenderedCards = currentScrolledWidth > targetDom.clientWidth;
      const isFinishScroll = currentScrolledWidth === targetDom.scrollWidth;
      isRenderedCards && isFinishScroll && setIsPlayMove(false); // 스크롤 다됐을 때 멈추는 기능
      targetDom.scrollLeft += 1;
    },
    15,
    isPlayMove,
  );

  useEffect(() => {
    moveScrollToFront();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveScrollToFront, ...(deps ? deps : [])]);

  return [isPlayMove, setIsPlayMove, moveScrollToFront, moveScrollToBack];
};

export default useScrollAnimation;
