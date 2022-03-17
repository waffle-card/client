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

  const calculateDelay = useCallback(
    (divideValue: number): number | undefined => {
      return targetDom ? targetDom.scrollWidth / divideValue : undefined;
    },
    [targetDom],
  );

  useInterval(
    () => {
      if (!(targetDom instanceof Element)) return;

      const { scrollLeft, clientWidth } = targetDom;
      const currentScrolledWidth = Math.ceil(scrollLeft + clientWidth);
      const isRenderedCards = currentScrolledWidth > targetDom.clientWidth;
      const isFinishScroll = currentScrolledWidth === targetDom.scrollWidth;

      isRenderedCards && isFinishScroll && setIsPlayMove(false);
      targetDom.scrollLeft += 1;
    },
    calculateDelay(150),
    isPlayMove,
  );

  useEffect(() => {
    moveScrollToFront();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveScrollToFront, ...(deps ? deps : [])]);

  return [isPlayMove, setIsPlayMove, moveScrollToFront, moveScrollToBack];
};

export default useScrollAnimation;
