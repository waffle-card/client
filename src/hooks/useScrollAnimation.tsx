import { useState, useContext, useEffect, useCallback } from 'react';
import { ModalsStateContext } from '@/contexts';
import { useInterval } from '@/hooks';

type ReturnTypes = [(on: boolean) => void, () => void, () => void];

const useScrollAnimation = <T,>(
  containerDom: HTMLElement | null,
  deps: T[],
): ReturnTypes => {
  const [isPlayMove, setIsPlayMove] = useState(true);
  const openedModals = useContext(ModalsStateContext);
  const [type] = deps;

  const moveScrollToFront = useCallback(() => {
    if (!(containerDom instanceof Element)) return;
    containerDom.scrollLeft = 0;
    setIsPlayMove(true);
  }, [containerDom]);

  const moveScrollToBack = useCallback(() => {
    if (!(containerDom instanceof Element)) return;
    containerDom.scrollLeft = containerDom.scrollWidth;
  }, [containerDom]);

  useInterval(
    () => {
      if (!(containerDom instanceof Element)) return;

      const { scrollLeft, clientWidth } = containerDom;
      const scrolledWidth = Math.ceil(scrollLeft + clientWidth);
      const isRenderedCards = scrolledWidth > containerDom.clientWidth;
      const isFinishScroll = scrolledWidth === containerDom.scrollWidth;

      isRenderedCards && isFinishScroll && setIsPlayMove(false);
      containerDom.scrollLeft += 1;
    },
    15,
    isPlayMove,
  );

  useEffect(() => {
    openedModals.length ? setIsPlayMove(false) : setIsPlayMove(true);
  }, [openedModals.length]);

  useEffect(() => {
    moveScrollToFront();
  }, [moveScrollToFront, type]);

  return [setIsPlayMove, moveScrollToFront, moveScrollToBack];
};

export default useScrollAnimation;
