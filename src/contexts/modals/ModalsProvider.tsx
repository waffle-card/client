import React, { useState } from 'react';
import { createContext } from 'react';
import { ModalsStateType } from '@/types';

interface ModalsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const ModalsDispatchContext = createContext<{
  open: (Component: React.ReactElement, props: { [key: string]: any }) => void;
  close: (Component: React.ReactElement) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  open: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: () => {},
});

export const ModalsStateContext = createContext<ModalsStateType[]>([]);

const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const [openedModals, setOpenedModals] = useState<ModalsStateType[]>([]);

  const open = (
    Component: React.ReactElement,
    props: { [key: string]: any },
  ) => {
    setOpenedModals(modals => {
      return [...modals, { Component, props }];
    });
  };

  const close = (Component: React.ReactElement) => {
    setOpenedModals(modals => {
      return modals.filter(modal => modal.Component !== Component);
    });
  };

  const dispatch = { open, close };

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
