import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

const useClickAway = handler => {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = event => {
      !element.contains(event.target) && savedHandler.current(event);
    };

    events.forEach(eventName => {
      document.addEventListener(eventName, handleEvent);
    });

    return () => {
      events.forEach(eventName => {
        document.removeEventListener(eventName, handleEvent);
      });
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
