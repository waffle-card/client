import { useCallback, useState } from 'react';

const useToggle = (initState = false): [boolean, () => void] => {
  const [state, setState] = useState(initState);
  const toggle = useCallback((): void => setState(state => !state), []);

  return [state, toggle];
};

export default useToggle;
