import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { useAddBoardMutation, useGetAllBoardsQuery } from '../../store/kanban/kanbanApi';
import BoardItemShortCut, { StyledBoardItemShortCut } from './BoardItemShortCut';
import { BoardListTypes } from '../../interfaces';

const StyledBoardsList = styled('main')`
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});

  .board-list__create {
    cursor: pointer;
  }
`;

function createBoard(): BoardListTypes {
  const boardName = Date.now().toString();
  return {
    [boardName]: {
      title: 'board1Name',
      description: 'description',
      order: 1,
      data: {
        column1: {
          title: 'column1Name',
          description: 'description1',
          order: 1,
          data: {
            str1: {
              title: 'string',
              description: 'string',
              order: 1,
            },
          },
        },
      },
    },
  };
}

function BoardsList() {
  const { data } = useGetAllBoardsQuery('vasya');
  const { t } = useTranslation();
  const [addBoard] = useAddBoardMutation();

  return (
    <StyledBoardsList>
      {data &&
        Array.from(Object.keys(data)).map((boardId) => (
          <BoardItemShortCut board={data[boardId]} boardId={boardId} key={boardId + Date.now()} />
        ))}
      <StyledBoardItemShortCut
        className="board-list__create"
        onClick={() => {
          console.log('create');
          addBoard({ userId: 'vasya', data: createBoard() });
        }}
      >
        <h3>{t('header.newBoard')}</h3>
      </StyledBoardItemShortCut>
    </StyledBoardsList>
  );
}

export default BoardsList;
