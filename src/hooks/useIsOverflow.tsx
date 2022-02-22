import { useEffect, useRef, useState } from 'react';

const useIsOverflow = <T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T>,
  boolean,
] => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ref = useRef<T>(null);
  const scrollWidth = ref.current?.scrollWidth;

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const isOverflow = element.scrollWidth > element.clientWidth;
      setIsOverflow(isOverflow);
    }
  }, [scrollWidth]);

  return [ref, isOverflow];
};

export default useIsOverflow;
