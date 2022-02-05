import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const element = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [element]);

  return createPortal(children, element);
};

export default Portal;
