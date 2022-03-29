import { useState, useEffect, useCallback } from 'react';
import { useInterval } from '@/hooks';

interface ReturnTypes {
  isPlaying: boolean;
  setIsPlaying: (on: boolean) => void;
  isIntersecting: boolean;
  setObserveTarget: (instance: HTMLDivElement | null) => void;
  moveScrollToFront: () => void;
  moveScrollToBack: () => void;
}

const useScrollAnimation = (
  targetDom: HTMLElement | null,
  deps?: ('total' | 'my' | 'like' | undefined)[],
): ReturnTypes => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [observeTarget, setObserveTarget] = useState<HTMLDivElement | null>(
    null,
  );

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
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
    if (!(targetDom instanceof Element)) return;
    targetDom.scrollLeft = 0;
    setIsPlaying(true);
  }, [targetDom]);

  const moveScrollToBack = useCallback(() => {
    if (!(targetDom instanceof Element)) return;
    targetDom.scrollLeft = targetDom.scrollWidth;
  }, [targetDom]);

  useInterval(
    () => {
      if (!(targetDom instanceof Element)) return;
      targetDom.scrollLeft += targetDom?.scrollWidth / 4000;
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
    isIntersecting,
    setObserveTarget,
    moveScrollToFront,
    moveScrollToBack,
  };
};

export default useScrollAnimation;
