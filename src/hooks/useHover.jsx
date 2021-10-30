import { useCallback, useEffect, useRef, useState } from 'react';

const useHover = () => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = useCallback(() => setState(true), []);
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseOver);
      element.addEventListener('mouseleave', handleMouseOut);

      return () => {
        element.removeEventListener('mouseenter', handleMouseOver);
        element.removeEventListener('mouseleave', handleMouseOut);
      };
    }
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, state];
};

export default useHover;
