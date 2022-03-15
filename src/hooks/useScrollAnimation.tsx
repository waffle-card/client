import { useState, useEffect, useCallback } from 'react';
import { useInterval } from '@/hooks';

type ReturnTypes = [boolean, (on: boolean) => void, () => void, () => void];

const useScrollAnimation = <T,>(
  targetDom: HTMLElement | null,
  deps?: T[],
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

  const calculateScrolledWidth = (): number | undefined => {
    if (!(targetDom instanceof Element)) return;
    const { scrollLeft, clientWidth } = targetDom;
    return Math.ceil(scrollLeft + clientWidth);
  };

  const calculateDelay = (num: number): number | undefined => {
    const ScrolledWidth = calculateScrolledWidth();
    return ScrolledWidth && ScrolledWidth / num;
  };

  useInterval(
    () => {
      if (!(targetDom instanceof Element)) return;
      const scrolledWidth = calculateScrolledWidth();
      const isRenderedCards =
        scrolledWidth && scrolledWidth > targetDom.clientWidth;
      const isFinishScroll = scrolledWidth === targetDom.scrollWidth;

      isRenderedCards && isFinishScroll && setIsPlayMove(false);
      targetDom.scrollLeft += 1;
    },
    calculateDelay(130),
    isPlayMove,
  );

  useEffect(() => {
    moveScrollToFront();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveScrollToFront, ...(deps ? deps : [])]);

  return [isPlayMove, setIsPlayMove, moveScrollToFront, moveScrollToBack];
};

export default useScrollAnimation;
