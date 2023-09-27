/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import ModalContext, { ModalDataContextType } from '../../context';
import CreateColumn from '../board/forms/CreateColumn';
import CreateTask from '../board/forms/CreateTask';
import CreateBoard from '../board/forms/CreateBoard';
import EditTask from '../board/forms/EditTask';
import EditColumn from '../board/forms/EditColumn';
import EditBoard from '../board/forms/EditBoard';

export function checkModalContent(modalData: ModalDataContextType) {
  const { type, userId, boardId, columnId, taskId } = modalData;
  return (
    (type === 'addColumn' && userId && boardId && <CreateColumn ids={{ userId, boardId }} />) ||
    (type === 'editBoard' && userId && boardId && <EditBoard ids={{ userId, boardId }} />) ||
    (type === 'addBoard' && userId && <CreateBoard ids={{ userId }} />) ||
    (type === 'addTask' && userId && boardId && columnId && (
      <CreateTask
        ids={{
          userId,
          boardId,
          columnId,
        }}
      />
    )) ||
    (type === 'editColumn' && userId && boardId && columnId && (
      <EditColumn
        ids={{
          userId,
          boardId,
          columnId,
        }}
      />
    )) ||
    (type === 'editTask' && userId && boardId && columnId && taskId && (
      <EditTask
        ids={{
          userId,
          boardId,
          columnId,
          taskId,
        }}
      />
    )) || <></>
  );
}

function BoardWrapper({ children }: { children: string | JSX.Element | JSX.Element[] }) {
  const [modalData, setModalData] = useState<undefined | ModalDataContextType>(undefined);
  return (
    <ModalContext.Provider value={{ modalData, setModalData }}>
      {children}
      {modalData && <Modal>{checkModalContent(modalData)}</Modal>}
    </ModalContext.Provider>
  );
}

export default BoardWrapper;
