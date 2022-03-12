import React, { createContext, useContext, useState } from 'react';
import { Spinner } from '@/components';

const LoadingDispatchContext = createContext<(loading: boolean) => void>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
);

const LoadingStateContext = createContext(false);

interface LoadingProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingStateContext.Provider value={loading}>
      <LoadingDispatchContext.Provider value={setLoading}>
        {children}
        <Spinner loading={loading} />
      </LoadingDispatchContext.Provider>
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => useContext(LoadingStateContext);
export const useLoadingDispatch = () => useContext(LoadingDispatchContext);
