import { useCallback, useEffect, useRef } from 'react';

const useTimeoutFn = (fn, ms) => {
  const timeoutId = useRef();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  // 아래 로직을 추가하지 않으면 해당 컴포넌트에서 벗어났어도 timeout이 그대로 남아서 실행되는 경우가 발생할 수 있다.
  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
