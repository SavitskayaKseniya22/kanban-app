import React from 'react';
import styled from 'styled-components';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { useGetAllBoardsQuery } from '../../store/kanban/kanbanApi';
import BoardItemShortCut from './BoardItemShortCut';
import { useAppSelector } from '../../store/store';
import ModalContext from '../../contexts/modalContext';
import { ActiveUserTypes } from '../../interfaces';

const StyledBoardsList = styled('main')`
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});

  position: relative;

  .board-list__create {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 3rem;
  }
`;

function BoardsList() {
  const { activeUser } = useAppSelector((state) => state.persist.user);
  const { localId: userId, idToken } = activeUser as ActiveUserTypes;
  const { data } = useGetAllBoardsQuery({ userId, idToken }, { skip: !activeUser });

  const modalContext = React.useContext(ModalContext);

  return (
    <StyledBoardsList>
      {data && data.length ? (
        data.map((board) => <BoardItemShortCut board={board} key={board.id} />)
      ) : (
        <span>The board has not been added. Please add a new board.</span>
      )}

      <button
        type="button"
        className="board-list__create"
        onClick={() => {
          modalContext.setModalData({ type: 'addBoard', userId });
        }}
      >
        <i className="fa-solid fa-plus" />
      </button>
    </StyledBoardsList>
  );
}

export default BoardsList;
