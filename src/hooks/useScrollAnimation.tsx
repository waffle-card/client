import { useState, useEffect, useCallback } from 'react';
import { useInterval } from '@/hooks';

interface ReturnTypes {
  isPlaying: boolean;
  isIntersecting: boolean;
  setIsPlaying: (on: boolean) => void;
  moveScrollToFront: () => void;
  moveScrollToBack: () => void;
  setObserveTarget: (instance: HTMLDivElement | null) => void;
}

const useScrollAnimation = (
  observeTargetDom: HTMLElement | null,
  deps?: ('total' | 'my' | 'like' | undefined)[],
): ReturnTypes => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [observeTarget, setObserveTarget] = useState<HTMLDivElement | null>(
    null,
  );
  const [isIntersecting, setIsIntersecting] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      console.log('observe');
      setIsIntersecting(true);
      setIsPlaying(false);
    } else {
      setIsIntersecting(false);
    }
  };
  useEffect(() => {
    let observer: IntersectionObserver;
    if (observeTarget) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.1,
      });
      observer.observe(observeTarget);
    }
    return () => observer && observer.disconnect();
  }, [observeTarget]);

  const moveScrollToFront = useCallback(() => {
    if (!(observeTargetDom instanceof Element)) return;
    observeTargetDom.scrollLeft = 0;
    setIsPlaying(true);
  }, [observeTargetDom]);

  const moveScrollToBack = useCallback(() => {
    if (!(observeTargetDom instanceof Element)) return;
    observeTargetDom.scrollLeft = observeTargetDom.scrollWidth;
  }, [observeTargetDom]);

  useInterval(
    () => {
      if (!(observeTargetDom instanceof Element)) return;
      observeTargetDom.scrollLeft += 1;
    },
    isPlaying ? 15 : null,
  );

  useEffect(() => {
    moveScrollToFront();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveScrollToFront, ...(deps ? deps : [])]);

  return {
    isPlaying,
    setIsPlaying,
    moveScrollToFront,
    moveScrollToBack,
    setObserveTarget,
    isIntersecting,
  };
};

export default useScrollAnimation;
