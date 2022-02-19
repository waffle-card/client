import { useCallback, useEffect, useRef } from 'react';

const useScrollToBottom = () => {
  const ref = useRef(null);
  const commentList = ref.current;

  const scrollToBottom = useCallback(() => {
    if (commentList) {
      commentList.scrollTop = commentList.scrollHeight;
    }
  }, [commentList]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return ref;
};

export default useScrollToBottom;
