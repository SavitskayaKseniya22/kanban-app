import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BoardTypes } from '../../interfaces';
import { useDeleteBoardMutation } from '../../store/kanban/kanbanApi';

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
    gap: 2rem;
    font-size: 1.5rem;
    padding: 0.5rem;
  }
`;

function BoardItemShortCut({ board }: { board: BoardTypes }) {
  const { title, description, id } = board;
  const [deleteBoard] = useDeleteBoardMutation();

  return (
    <StyledBoardItemShortCut data-id={id}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="controls">
        <Link to={`${id}`}>
          <i className="fa-solid fa-up-right-from-square" />
        </Link>
        <button
          type="button"
          onClick={() => {
            deleteBoard({ userId: board.ancestors.userId, boardId: id });
          }}
        >
          <i className="fa-solid fa-trash-can" />
        </button>
      </div>
    </StyledBoardItemShortCut>
  );
}

export default BoardItemShortCut;
