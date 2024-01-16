/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import ModalContext, { ModalDataContextType } from '../../contexts/modalContext';
import CreateColumn from '../board/forms/CreateColumn';
import CreateTask from '../board/forms/CreateTask';
import CreateBoard from '../board/forms/CreateBoard';
import EditTask from '../board/forms/EditTask';
import EditColumn from '../board/forms/EditColumn';
import EditBoard from '../board/forms/EditBoard';
import { useAppSelector } from '../../store/store';
import { ActiveUserTypes } from '../../interfaces';

export function checkModalContent({
  modalData,
  idToken,
}: {
  modalData: ModalDataContextType;
  idToken: string;
}) {
  const { type, userId, boardId, columnId, taskId } = modalData;

  return (
    (type === 'addColumn' && userId && boardId && (
      <CreateColumn ids={{ userId, boardId, idToken }} />
    )) ||
    (type === 'editBoard' && userId && boardId && (
      <EditBoard ids={{ userId, boardId, idToken }} />
    )) ||
    (type === 'addBoard' && userId && <CreateBoard ids={{ userId, idToken }} />) ||
    (type === 'addTask' && userId && boardId && columnId && (
      <CreateTask
        ids={{
          userId,
          boardId,
          columnId,
          idToken,
        }}
      />
    )) ||
    (type === 'editColumn' && userId && boardId && columnId && (
      <EditColumn
        ids={{
          userId,
          boardId,
          columnId,
          idToken,
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
          idToken,
        }}
      />
    )) || <></>
  );
}

function BoardWrapper({ children }: { children: string | JSX.Element | JSX.Element[] }) {
  const { activeUser } = useAppSelector((state) => state.persist.user);
  const { idToken } = activeUser as ActiveUserTypes;

  const [modalData, setModalData] = useState<undefined | ModalDataContextType>(undefined);

  return (
    <ModalContext.Provider value={{ modalData, setModalData }}>
      {children}
      {modalData && <Modal>{checkModalContent({ modalData, idToken })}</Modal>}
    </ModalContext.Provider>
  );
}

export default BoardWrapper;
