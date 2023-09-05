import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BoardTypes } from '../../interfaces';

export const StyledBoardItemShortCut = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 0.5rem;
  width: 250px;
  padding: 1rem;
  background-color: hsla(0, 0%, 90%, 0.6);
  position: relative;

  p {
    margin: 0.5rem;
  }

  .board-delete,
  .board-open {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: none;
    position: absolute;
  }

  .board-delete {
    color: #7953f5;
    right: 0.5rem;
    bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .board-open {
    top: 0;
    right: 0;
    font-size: 2rem;
    color: #3b8f43;
    opacity: 0.6;
    transition: 0.5s;

    &:hover {
      transition: 0.5s;
      opacity: 1;
    }
  }
`;

function BoardItemShortCut({ board, id }: { board: BoardTypes; id: string }) {
  const { name, description } = board;
  return (
    <StyledBoardItemShortCut>
      <h3> {name} </h3>
      <p>{description}</p>

      <button
        type="button"
        onClick={() => {
          console.log('delete');
        }}
        className="board-delete"
      >
        <i className="fa-solid fa-trash-can" />
      </button>

      <Link to={`${id}`} className="board-open">
        <i className="fa-solid fa-up-right-from-square" />
      </Link>
    </StyledBoardItemShortCut>
  );
}

export default BoardItemShortCut;
