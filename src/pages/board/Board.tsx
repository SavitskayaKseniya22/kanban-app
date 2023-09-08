import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../store/store';

import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { BoardDataTypes } from '../../interfaces';
import { useAddColumnMutation, useGetBoardQuery } from '../../store/kanban/kanbanApi';
import BoardContent from './BoardContent';

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

  const { data, isError } = useGetBoardQuery(
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
      {data && <BoardContent data={data} />}
      <button
        type="button"
        className="board__button_add"
        onClick={() => {
          addColumn({
            userId,
            boardId: id as string,
            data: createColumn({
              userId,
              boardId: id as string,
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
