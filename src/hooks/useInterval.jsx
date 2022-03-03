import { useEffect, useRef } from 'react';

function useInterval(callback, delay, play) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      if (!play) clearInterval(id);
      return () => clearInterval(id);
    }
  }, [delay, play]);
}

export default useInterval;
