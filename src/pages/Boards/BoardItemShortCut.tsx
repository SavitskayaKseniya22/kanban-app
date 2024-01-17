/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ActiveUserTypes, BoardTypes } from '../../interfaces';
import { useDeleteBoardMutation } from '../../store/kanban/kanbanApi';
import ModalContext from '../../contexts/modalContext';
import { useAppSelector } from '../../store/store';

export const StyledBoardItemShortCut = styled('div')`
  text-align: center;
  border-radius: 0.5rem;
  width: 250px;
  padding: 2rem;
  background-color: hsla(0, 0%, 90%, 0.6);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    position: absolute;
    top: 0rem;
    right: 0rem;
    font-size: 1.5rem;
    padding: 0.5rem;
  }
`;

function BoardItemShortCut({ board }: { board: BoardTypes }) {
  const { title, description, id: boardId, ancestors } = board;
  const [deleteBoard] = useDeleteBoardMutation();
  const modalContext = React.useContext(ModalContext);

  const { activeUser } = useAppSelector((state) => state.persist.user);
  const { idToken } = activeUser as ActiveUserTypes;

  const { t } = useTranslation();

  return (
    <StyledBoardItemShortCut data-id={boardId}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="controls">
        <Link to={`${boardId}`} title={t('data.seeBoard')}>
          <i className="fa-solid fa-up-right-from-square" />
        </Link>
        <button
          type="button"
          title={t('data.editBoard')}
          onClick={() => {
            modalContext.setModalData({ type: 'editBoard', userId: ancestors.userId, boardId });
          }}
        >
          <i className="fa-solid fa-pen" />
        </button>
        <button
          type="button"
          title={t('data.deleteBoard')}
          onClick={() => {
            deleteBoard({ userId: ancestors.userId, boardId, idToken });
          }}
        >
          <i className="fa-solid fa-trash-can" />
        </button>
      </div>
    </StyledBoardItemShortCut>
  );
}

export default BoardItemShortCut;
