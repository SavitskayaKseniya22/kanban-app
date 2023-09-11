import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { useGetBoardQuery } from '../../store/kanban/kanbanApi';
import BoardContent from './BoardContent';
import Modal from '../../components/Modal';
import CreateColumn from './forms/CreateColumn';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError } = useGetBoardQuery(
    { userId, boardId: id as string },
    { skip: !activeUser }
  );

  const navigate = useNavigate();

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
          setIsModalOpen(true);
        }}
      >
        <i className="fa-solid fa-plus" />
      </button>
      {isModalOpen && id && (
        <Modal>
          <CreateColumn userId={userId} boardId={id} data={data} />
        </Modal>
      )}
    </StyledBoard>
  );
}

export default Board;
