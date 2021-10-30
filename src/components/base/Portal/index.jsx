import { useMemo } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, selector }) => {
  const element = useMemo(() => document.querySelector(selector), [selector]);

  return createPortal(children, element);
};

export default Portal;
