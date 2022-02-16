import { useEffect, useRef, useState } from 'react';

const useIsOverflow = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const ref = useRef(null);
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
