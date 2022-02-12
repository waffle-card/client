import React, { useLayoutEffect } from 'react';

const useIsOverflow = (element, dev) => {
  const [isOverflow, setIsOverflow] = React.useState(false);

  useLayoutEffect(() => {
    const trigger = () => {
      const hasOverflow = element.scrollWidth > element.clientWidth;
      console.log('trigger', element);

      setIsOverflow(hasOverflow);
    };

    if (element) {
      trigger();
    }
  }, [dev, element]);

  return isOverflow;
};

export default useIsOverflow;
