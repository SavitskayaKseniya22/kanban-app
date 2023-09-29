import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ModalContext from '../../context';
import { useGetBoardQuery } from '../../store/kanban/kanbanApi';
import { useAppSelector } from '../../store/store';
import BoardContent from './BoardContent';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';

const StyledBoard = styled('main')`
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});
  position: relative;
  justify-content: center;

  .board__button_add {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 3rem;
  }
  span {
    align-self: center;
  }
`;

function Board() {
  const { activeUser } = useAppSelector((state) => state.persist.user);
  const userId = useRef(activeUser!.localId).current;
  const { id } = useParams();
  const boardId = useRef(id || '').current;

  const { data, isError, isSuccess } = useGetBoardQuery({ userId, boardId }, { skip: !activeUser });

  const navigate = useNavigate();
  const modalContext = React.useContext(ModalContext);

  useEffect(() => {
    if (isError) {
      navigate('/boards');
    }
  }, [isError, navigate]);

  return (
    <StyledBoard>
      {isSuccess && data && data.length ? (
        <BoardContent data={data} />
      ) : (
        <span>The column has not been added. Please add a new column.</span>
      )}
      <button
        type="button"
        className="board__button_add"
        onClick={() => {
          modalContext.setModalData({ type: 'addColumn', userId, boardId });
        }}
      >
        <i className="fa-solid fa-plus" />
      </button>
    </StyledBoard>
  );
}

export default Board;
