import { createContext } from 'react';

export type ModalDataContextType = {
  type: 'addColumn' | 'editColumn' | 'addTask' | 'editTask' | 'addBoard' | 'editBoard';
  userId: string | undefined;
  boardId?: string | undefined;
  columnId?: string | undefined;
  taskId?: string | undefined;
};

export type ModalDataContextTypeCopy<T> = T extends 'editTask'
  ? { userId: string; boardId: string; columnId: string; taskId: string }
  : T extends 'editColumn' | 'addTask'
  ? { userId: string; boardId: string; columnId: string }
  : T extends 'addColumn' | 'editBoard'
  ? { userId: string; boardId: string }
  : T extends 'addBoard'
  ? { userId: string }
  : undefined;

export type ModalContextType = {
  modalData: undefined | ModalDataContextType;
  setModalData: React.Dispatch<React.SetStateAction<undefined | ModalDataContextType>>;
};

const ModalContext = createContext({} as ModalContextType);

export default ModalContext;
