import { useCallback, useEffect, useRef, useState } from 'react';

const useHover = () => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = useCallback(() => setState(true), []);
  const handleMouseLeave = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
<<<<<<< HEAD
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
=======
      element.addEventListener('mouseenter', handleMouseOver);
      element.addEventListener('mouseleave', handleMouseOut);

      return () => {
        element.removeEventListener('mouseenter', handleMouseOver);
        element.removeEventListener('mouseleave', handleMouseOut);
>>>>>>> ffd13ca37d456b9c7018eca734b46a922c6931ed
      };
    }
  }, [ref, handleMouseEnter, handleMouseLeave]);

  return [ref, state];
};

export default useHover;
