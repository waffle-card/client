import { useState, useEffect, useCallback, useContext } from 'react';
import { ModalsStateContext } from '@/contexts';
import { useInterval } from '@/hooks';

interface ReturnTypes {
  isPlaying: boolean;
  isShowingLastEl: boolean;
  setIsPlaying: (on: boolean) => void;
  setObserveTarget: (instance: HTMLDivElement | null) => void;
  moveScrollToFront: () => void;
  moveScrollToBack: () => void;
}

const useScrollAnimation = (
  targetDom: HTMLElement | null,
  deps?: ('total' | 'my' | 'like' | undefined)[],
): ReturnTypes => {
  const openedModals = useContext(ModalsStateContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShowingLastEl, setIsShowingLastEl] = useState(false);
  const [observeTarget, setObserveTarget] = useState<HTMLDivElement | null>(
    null,
  );

  const moveScrollToFront = useCallback(() => {
    if (!(targetDom instanceof Element)) return;
    targetDom.scrollLeft = 0;
  }, [targetDom]);

  const moveScrollToBack = useCallback(() => {
    if (!(targetDom instanceof Element)) return;
    targetDom.scrollLeft = targetDom.scrollWidth;
  }, [targetDom]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      setIsShowingLastEl(true);
      setIsPlaying(false);
    } else {
      setIsShowingLastEl(false);
    }
  };

  useInterval(
    () => {
      if (!(targetDom instanceof Element)) return;
      targetDom.scrollLeft += targetDom?.scrollWidth / 6000;
    },
    isPlaying ? 15 : null,
  );

  useEffect(() => {
    moveScrollToFront();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveScrollToFront, ...(deps ? deps : [])]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (observeTarget) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(observeTarget);
    }
    return () => observer && observer.disconnect();
  }, [observeTarget]);

  useEffect(() => {
    openedModals.length ? setIsPlaying(false) : setIsPlaying(true);
  }, [openedModals.length, setIsPlaying]);

  return {
    isPlaying,
    isShowingLastEl,
    setIsPlaying,
    setObserveTarget,
    moveScrollToFront,
    moveScrollToBack,
  };
};

export default useScrollAnimation;
