import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import Column from './Column';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';

const StyledBoard = styled('main')`
  background: no-repeat bottom right/40% scroll url(${backBoardsPic});
`;

function Board() {
  const { boards } = useSelector((state: RootState) => state.persist.kanban);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!boards) {
      navigate('/boards');
    }
  }, [boards, navigate]);

  return (
    <StyledBoard>
      {boards &&
        id &&
        boards[id] &&
        Array.from(Object.keys(boards[id].data)).map((columnItemId) => (
          <Column columnProp={boards[id].data[columnItemId]} key={columnItemId + Date.now()} />
        ))}
    </StyledBoard>
  );
}

export default Board;
