import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ModalContext from '../../context';
import { useGetBoardQuery } from '../../store/kanban/kanbanApi';
import { RootState } from '../../store/store';
import BoardContent from './BoardContent';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';

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

function Board() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const userId = useRef(activeUser!.localId).current;
  const { id } = useParams();

  const { data, isError } = useGetBoardQuery(
    { userId, boardId: id as string },
    { skip: !activeUser }
  );

  const navigate = useNavigate();
  const modalContext = React.useContext(ModalContext);

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
          if (id) {
            modalContext.setModalData({ type: 'addColumn', userId, boardId: id, data });
          }
        }}
      >
        <i className="fa-solid fa-plus" />
      </button>
    </StyledBoard>
  );
}

export default Board;
