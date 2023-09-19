import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { useGetAllBoardsQuery } from '../../store/kanban/kanbanApi';
import BoardItemShortCut from './BoardItemShortCut';
import { RootState } from '../../store/store';

import ModalContext from '../../context';
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
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const userId = useRef((activeUser as ActiveUserTypes).localId).current;
  const { data } = useGetAllBoardsQuery(userId, { skip: !activeUser });

  const modalContext = React.useContext(ModalContext);

  return (
    <StyledBoardsList>
      {data && data.length > 0 ? (
        data.map((board) => <BoardItemShortCut board={board} key={board.boardId + Date.now()} />)
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
