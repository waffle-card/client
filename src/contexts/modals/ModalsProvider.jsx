import React, { useState } from 'react';
import { createContext } from 'react';

export const ModalsDispatchContext = createContext({
  open: () => {},
  close: () => {},
});

export const ModalsStateContext = createContext([]);

const ModalsProvider = ({ children }) => {
  const [openedModals, setOpenedModals] = useState([]);

  const open = (Component, props) => {
    setOpenedModals(modals => {
      return [...modals, { Component, props }];
    });
  };

  const close = Component => {
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
