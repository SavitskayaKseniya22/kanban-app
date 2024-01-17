/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import ModalContext from '../../contexts/modalContext';
import { useGetBoardQuery } from '../../store/kanban/kanbanApi';
import { useAppSelector } from '../../store/store';
import BoardContent from './BoardContent';
import backBoardsPic from '../../assets/images/png/d7a8389a8e4a9b5b4a83374ea21f8447.png';
import { ActiveUserTypes } from '../../interfaces';

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
  const { localId: userId, idToken } = activeUser as ActiveUserTypes;
  const { id } = useParams();
  const boardId = useRef(id || '').current;

  const { data, isError, isSuccess } = useGetBoardQuery(
    { userId, boardId, idToken },
    { skip: !activeUser }
  );

  const navigate = useNavigate();
  const modalContext = React.useContext(ModalContext);
  const { t } = useTranslation();

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
        <span>{t('data.nocolumn')}</span>
      )}
      <button
        type="button"
        className="board__button_add"
        title={t('data.addColumn')}
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
