import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { useGetAllBoardsQuery } from '../../store/kanban/kanbanApi';
import BoardItemShortCut, { StyledBoardItemShortCut } from './BoardItemShortCut';
import { RootState } from '../../store/store';
import Modal from '../../components/Modal';
import CreateBoard from '../board/forms/CreateBoard';

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

function BoardsList() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const userId = useRef(activeUser!.localId).current;
  const { data } = useGetAllBoardsQuery(userId, { skip: !activeUser });
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledBoardsList>
      {data &&
        Array.from(Object.keys(data)).map((boardId) => (
          <BoardItemShortCut board={data[boardId]} key={boardId + Date.now()} />
        ))}
      <StyledBoardItemShortCut
        className="board-list__create"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <h3>{t('header.newBoard')}</h3>
      </StyledBoardItemShortCut>
      {isModalOpen && (
        <Modal>
          <CreateBoard userId={userId} />
        </Modal>
      )}
    </StyledBoardsList>
  );
}

export default BoardsList;
