import { useState, useEffect, useCallback } from 'react';
import { useInterval } from '@/hooks';

type ReturnTypes = [
  boolean,
  (on: boolean) => void,
  () => void,
  () => void,
  (instance: HTMLDivElement | null) => void,
];

const useScrollAnimation = (
  targetDom: HTMLElement | null,
  deps?: ('total' | 'my' | 'like' | undefined)[],
): ReturnTypes => {
  const [isPlayMove, setIsPlayMove] = useState(true);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      console.log('observe');
      setIsPlayMove(false);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

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
      targetDom.scrollLeft += 1;
    },
    15,
    isPlayMove,
  );

  useEffect(() => {
    moveScrollToFront();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveScrollToFront, ...(deps ? deps : [])]);

  return [
    isPlayMove,
    setIsPlayMove,
    moveScrollToFront,
    moveScrollToBack,
    setTarget,
  ];
};

export default useScrollAnimation;
