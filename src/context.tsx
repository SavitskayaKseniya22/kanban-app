import { createContext } from 'react';
import { ColumnTypes, TaskTypes } from './interfaces';

export type ModalDataContextType = {
  type: 'addColumn' | 'editColumn' | 'addTask' | 'editTask';
  userId: string | undefined;
  boardId?: string | undefined;
  columnId?: string | undefined;
  data: TaskTypes[] | ColumnTypes[] | undefined;
};

export type ModalContextType = {
  modalData: undefined | ModalDataContextType;
  setModalData: React.Dispatch<React.SetStateAction<undefined | ModalDataContextType>>;
};

const ModalContext = createContext({} as ModalContextType);

export default ModalContext;
