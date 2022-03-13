import { useState, useContext, useEffect, useCallback } from 'react';
import { ModalsStateContext } from '@/contexts';
import { useInterval } from '@/hooks';

type ReturnTypes = [(on: boolean) => void, () => void, () => void];

const useScrollAnimation = <ResetDepType,>(
  containerDom: HTMLElement | null,
  resetDep: ResetDepType,
): ReturnTypes => {
  const [isPlayMove, setIsPlayMove] = useState(true);
  const openedModals = useContext(ModalsStateContext);

  const handleClickFrontButton = useCallback(() => {
    if (containerDom instanceof Element) {
      containerDom.scrollLeft = 0;
      setIsPlayMove(true);
    }
  }, [containerDom]);

  const handleClickBackButton = useCallback(() => {
    if (containerDom instanceof Element) {
      containerDom.scrollLeft = containerDom.scrollWidth;
    }
  }, [containerDom]);

  useInterval(
    () => {
      if (containerDom instanceof Element) {
        const { scrollLeft, clientWidth } = containerDom;
        const scrolledWidth = Math.ceil(scrollLeft + clientWidth);
        const isRenderedCards = scrolledWidth > containerDom.clientWidth;
        const isFinishScroll = scrolledWidth === containerDom.scrollWidth;

        isRenderedCards && isFinishScroll && setIsPlayMove(false);
        containerDom.scrollLeft += 1;
      }
    },
    15,
    isPlayMove,
  );

  useEffect(() => {
    openedModals.length ? setIsPlayMove(false) : setIsPlayMove(true);
  }, [openedModals.length]);

  useEffect(() => {
    handleClickFrontButton();
  }, [handleClickFrontButton, resetDep]);

  return [setIsPlayMove, handleClickFrontButton, handleClickBackButton];
};

export default useScrollAnimation;
