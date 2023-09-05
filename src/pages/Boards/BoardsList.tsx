import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { useGetAllBoardsQuery } from '../../store/kanban/kanbanApi';
import BoardItemShortCut, { StyledBoardItemShortCut } from './BoardItemShortCut';

const StyledBoardsList = styled('main')`
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});
`;

function BoardsList() {
  const { data } = useGetAllBoardsQuery('vasya');
  const { t } = useTranslation();

  return (
    <StyledBoardsList>
      {data &&
        Array.from(Object.keys(data)).map((boardItemId) => (
          <BoardItemShortCut
            board={data[boardItemId]}
            id={boardItemId}
            key={boardItemId + Date.now()}
          />
        ))}
      <StyledBoardItemShortCut
        onClick={() => {
          console.log('create');
        }}
      >
        <h3>{t('header.newBoard')}</h3>
      </StyledBoardItemShortCut>
    </StyledBoardsList>
  );
}

export default BoardsList;
