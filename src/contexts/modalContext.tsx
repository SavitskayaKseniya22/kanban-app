import { createContext } from 'react';

export type ModalDataContextType = {
  type: 'addColumn' | 'editColumn' | 'addTask' | 'editTask' | 'addBoard' | 'editBoard';
  userId: string | undefined;
  boardId?: string | undefined;
  columnId?: string | undefined;
  taskId?: string | undefined;
};

export type ModalContextType = {
  modalData: undefined | ModalDataContextType;
  setModalData: React.Dispatch<React.SetStateAction<undefined | ModalDataContextType>>;
};

const ModalContext = createContext({} as ModalContextType);

export default ModalContext;
