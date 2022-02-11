import React, { useLayoutEffect } from 'react';

const useIsOverflow = (ref, dev, callback) => {
  const [isOverflow, setIsOverflow] = React.useState(false);
  const { current } = ref;

  useLayoutEffect(() => {
    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      console.log(
        'triggrt',
        dev,
        ref,
        current,
        current.scrollWidth,
        current.clientWidth,
      );

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, dev, ref, current]);

  return isOverflow;
};

export default useIsOverflow;
