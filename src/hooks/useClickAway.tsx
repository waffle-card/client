import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

const useClickAway = <T extends HTMLElement>(
  // HTMLElement 제외한 나머지 타입만 넘겨주면 알아서 HTMLElement 도 확장해준다
  handler: (e?: Event) => void,
): RefObject<T> => {
  const ref = useRef<T>(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent: EventListener = e => {
      // addEventListener에 파라미터로 넘겨주려면 EventListener타입이어야한다
      // 그러나 여기엔 e.target에 대한 타입이 없어서 as로 설정해줘야한다
      e.stopPropagation();
      !element.contains(e.target as HTMLElement) && savedHandler.current(e);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
