import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import Column from './Column';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { BoardDataTypes } from '../../interfaces';
import { useAddColumnMutation, useGetBoardQuery } from '../../store/kanban/kanbanApi';

const StyledBoard = styled('main')`
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});
  gap: 1rem;
  overflow-x: auto;
  position: relative;

  .board__button_add {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 3rem;
  }
`;

export function createColumn({
  userId,
  boardId,
}: {
  userId: string;
  boardId: string;
}): BoardDataTypes {
  const columnId = Date.now().toString();
  return {
    [columnId]: {
      columnId,
      title: columnId,
      description: 'description1',
      order: 1,
      ancestors: {
        boardId,
        userId,
      },
      data: {},
    },
  };
}

function Board() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const userId = useRef(activeUser!.localId).current;
  const { id } = useParams();

  const { data: board, isError } = useGetBoardQuery(
    { userId, boardId: id as string },
    { skip: !activeUser }
  );

  const navigate = useNavigate();
  const [addColumn] = useAddColumnMutation();

  useEffect(() => {
    if (isError) {
      navigate('/boards');
    }
  }, [isError, navigate]);

  return (
    <StyledBoard>
      {board &&
        board.data &&
        Array.from(Object.keys(board.data)).map((columnItemId) => (
          <Column columnProp={board.data[columnItemId]} key={columnItemId + Date.now()} />
        ))}
      <button
        type="button"
        className="board__button_add"
        onClick={() => {
          addColumn({
            userId: board.ancestors.userId,
            boardId: board.boardId,
            data: createColumn({
              userId: board.ancestors.userId,
              boardId: board.boardId,
            }),
          });
        }}
      >
        <i className="fa-solid fa-plus" />
      </button>
    </StyledBoard>
  );
}

export default Board;
