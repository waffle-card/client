import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay?: number, play?: boolean) => {
  const savedCallback: React.MutableRefObject<(() => void) | undefined> =
    useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) return;

    const tick = () => {
      savedCallback.current && savedCallback.current();
    };

    const id = setInterval(tick, delay);
    if (!play) clearInterval(id);

    return () => clearInterval(id);
  }, [delay, play]);
};

export default useInterval;
