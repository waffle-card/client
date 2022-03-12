import { useState, useContext, useEffect, useCallback } from 'react';
import { ModalsIsOpenContext } from '@/contexts';
import { useInterval } from '@/hooks';

interface UseScrollAnimationProps {
  containerDom: HTMLElement | null;
  resetDep: 'total' | 'my' | 'like' | undefined;
}

type ReturnTypes = [() => void, () => void, (on: boolean) => void];

const useScrollAnimation = ({
  containerDom,
  resetDep,
}: UseScrollAnimationProps): ReturnTypes => {
  const [isPlayMove, setIsPlayMove] = useState(true);
  const isOpen = useContext(ModalsIsOpenContext);

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
    isOpen ? setIsPlayMove(false) : setIsPlayMove(true);
  }, [isOpen]);

  useEffect(() => {
    handleClickFrontButton();
  }, [handleClickFrontButton, resetDep]);

  return [handleClickFrontButton, handleClickBackButton, setIsPlayMove];
};

export default useScrollAnimation;
