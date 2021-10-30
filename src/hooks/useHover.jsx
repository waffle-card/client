import { useCallback, useEffect, useRef, useState } from 'react';

const useHover = () => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

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
