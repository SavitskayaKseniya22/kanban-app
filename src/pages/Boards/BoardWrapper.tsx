/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import ModalContext, { ModalDataContextType } from '../../context';
import { ColumnTypes, TaskTypes } from '../../interfaces';
import CreateColumn from '../board/forms/CreateColumn';
import CreateTask from '../board/forms/CreateTask';
import CreateBoard from '../board/forms/CreateBoard';
import EditTask from '../board/forms/EditTask';
import EditColumn from '../board/forms/EditColumn';
import EditBoard from '../board/forms/EditBoard';

function BoardWrapper({ children }: { children: string | JSX.Element | JSX.Element[] }) {
  const [modalData, setModalData] = useState<undefined | ModalDataContextType>(undefined);
  return (
    <ModalContext.Provider value={{ modalData, setModalData }}>
      {children}
      {modalData && (
        <Modal>
          {(modalData.type === 'addTask' &&
            modalData.userId &&
            modalData.boardId &&
            modalData.columnId && (
              <CreateTask
                userId={modalData.userId}
                boardId={modalData.boardId}
                columnId={modalData.columnId}
                data={modalData.data as TaskTypes[]}
              />
            )) ||
            (modalData.type === 'editTask' &&
              modalData.userId &&
              modalData.boardId &&
              modalData.columnId &&
              modalData.taskId && (
                <EditTask
                  userId={modalData.userId}
                  boardId={modalData.boardId}
                  columnId={modalData.columnId}
                  taskId={modalData.taskId}
                />
              )) ||
            (modalData.type === 'addColumn' && modalData.userId && modalData.boardId && (
              <CreateColumn
                userId={modalData.userId}
                boardId={modalData.boardId}
                data={modalData.data as ColumnTypes[]}
              />
            )) ||
            (modalData.type === 'editColumn' &&
              modalData.userId &&
              modalData.boardId &&
              modalData.columnId && (
                <EditColumn
                  userId={modalData.userId}
                  boardId={modalData.boardId}
                  columnId={modalData.columnId}
                />
              )) ||
            (modalData.type === 'addBoard' && modalData.userId && (
              <CreateBoard userId={modalData.userId} />
            )) ||
            (modalData.type === 'editBoard' && modalData.userId && modalData.boardId && (
              <EditBoard userId={modalData.userId} boardId={modalData.boardId} />
            )) || <></>}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export default BoardWrapper;
