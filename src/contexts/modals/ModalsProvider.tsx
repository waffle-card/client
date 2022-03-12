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
  open: () => {
    return;
  },
  close: () => {
    return;
  },
});

export const ModalsStateContext = createContext<ModalsStateType[]>([]);

export const ModalsIsOpenContext = createContext<boolean>(false);

const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const [openedModals, setOpenedModals] = useState<ModalsStateType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = (
    Component: React.ReactElement,
    props: { [key: string]: any },
  ) => {
    setOpenedModals(modals => {
      return [...modals, { Component, props }];
    });
    setIsOpen(true);
  };

  const close = (Component: React.ReactElement) => {
    setOpenedModals(modals => {
      return modals.filter(modal => modal.Component !== Component);
    });
    setIsOpen(false);
  };

  const dispatch = { open, close };

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        <ModalsIsOpenContext.Provider value={isOpen}>
          {children}
        </ModalsIsOpenContext.Provider>
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
