/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import ModalContext, { ModalDataContextType } from '../../context';
import { useGetBoardQuery } from '../../store/kanban/kanbanApi';
import { RootState } from '../../store/store';
import BoardContent from './BoardContent';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import CreateColumn from './forms/CreateColumn';
import { ColumnTypes, TaskTypes } from '../../interfaces';
import CreateTask from './forms/CreateTask';

const StyledBoard = styled('main')`
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});
  position: relative;

  .board__button_add {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 3rem;
  }
`;

function Board() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const userId = useRef(activeUser!.localId).current;
  const { id } = useParams();

  const [modalData, setModalData] = useState<undefined | ModalDataContextType>(undefined);

  const { data, isError } = useGetBoardQuery(
    { userId, boardId: id as string },
    { skip: !activeUser }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/boards');
    }
  }, [isError, navigate]);

  return (
    <ModalContext.Provider value={{ modalData, setModalData }}>
      <StyledBoard>
        {data && <BoardContent data={data} />}
        <button
          type="button"
          className="board__button_add"
          onClick={() => {
            if (id) {
              setModalData({ type: 'addColumn', userId, boardId: id, data });
            }
          }}
        >
          <i className="fa-solid fa-plus" />
        </button>
        {modalData && (
          <Modal>
            {(modalData.type === 'addColumn' && modalData.userId && modalData.boardId && (
              <CreateColumn
                userId={modalData.userId}
                boardId={modalData.boardId}
                data={modalData.data as ColumnTypes[]}
              />
            )) || <></>}
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
              )) || <></>}
          </Modal>
        )}
      </StyledBoard>
    </ModalContext.Provider>
  );
}

export default Board;

/*

            <EditColumn userId={userId} boardId={id} data={data} />
            <CreateTask userId={userId} boardId={id} columnId={columnId} data={data} />
            <EditTask userId={userId} boardId={id} columnId={columnId} data={data} />

*/
