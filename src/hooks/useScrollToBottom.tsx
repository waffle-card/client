import { useCallback, useEffect, useRef } from 'react';

const useScrollToBottom = (deps: any[]) => {
  const ref = useRef<HTMLElement>(null);
  const commentList = ref.current;

  const scrollToBottom = useCallback(() => {
    if (commentList) {
      commentList.scrollTop = commentList.scrollHeight;
    }
  }, [commentList]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToBottom, ...deps]);

  return ref;
};

export default useScrollToBottom;
