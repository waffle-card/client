import React, { useLayoutEffect } from 'react';

const useIsOverflow = (element, tabName) => {
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
  }, [tabName, element]);

  return isOverflow;
};

export default useIsOverflow;
