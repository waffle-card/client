import { useContext } from 'react';
import { ModalsDispatchContext } from '@/contexts';

export default function useModals() {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = (Component: React.ReactElement, props: any[]) => {
    open(Component, props);
  };

  const closeModal = (Component: React.ReactElement) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
