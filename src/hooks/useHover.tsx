import { useCallback, useEffect, useRef, useState } from 'react';

type UseHoverType<T extends HTMLElement> = [React.RefObject<T>, boolean];

const useHover = <T extends HTMLElement = HTMLElement>(): UseHoverType<T> => {
  const [state, setState] = useState<boolean>(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallback(() => setState(true), []);
  const handleMouseLeave = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ref, handleMouseEnter, handleMouseLeave]);

  return [ref, state];
};

export default useHover;
