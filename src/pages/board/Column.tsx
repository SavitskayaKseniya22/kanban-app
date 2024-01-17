/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ActiveUserTypes, ColumnTypes } from '../../interfaces';
import { StyledIconButton } from '../../styledComponents/SharedStyles';
import { useDeleteColumnMutation } from '../../store/kanban/kanbanApi';
import ColumnContent from './ColumnContent';
import ModalContext from '../../contexts/modalContext';
import { objectToArray } from '../../utils';
import { useAppSelector } from '../../store/store';

const StyledColumn = styled('li')`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 350px;
  height: 100%;
  padding: 0.5rem;
  gap: 1rem;
  background-color: rgba(230, 230, 230, 0.6);
  flex-shrink: 0;

  .column__tasks {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;
    background-color: #e5e5e5;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .column__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .column__controls {
    display: flex;
    justify-content: flex-end;
    button {
      ${StyledIconButton}

      &.column__controls_delete {
        font-size: 1.2rem;
      }
      &.column__controls_add {
        font-size: 1.5rem;
      }
    }
  }
`;

function Column({ columnProp }: { columnProp: ColumnTypes }) {
  const { title, description, id: columnId, ancestors, data } = columnProp;
  const { activeUser } = useAppSelector((state) => state.persist.user);
  const { idToken } = activeUser as ActiveUserTypes;

  const [deleteColumn] = useDeleteColumnMutation();
  const { t } = useTranslation();

  const modalContext = React.useContext(ModalContext);

  return (
    <StyledColumn>
      <div className="column__controls">
        <button
          type="button"
          title={t('data.editColumn')}
          onClick={() => {
            modalContext.setModalData({
              type: 'editColumn',
              ...ancestors,
              columnId,
            });
          }}
        >
          <i className="fa-solid fa-pen" />
        </button>
        <button
          type="button"
          title={t('data.deleteColumn')}
          onClick={() => {
            deleteColumn({ ...ancestors, columnId, idToken });
          }}
          className="column__controls_delete"
        >
          <i className="fa-solid fa-trash-can" />
        </button>
        <button
          type="button"
          title={t('data.addTask')}
          onClick={() => {
            modalContext.setModalData({
              type: 'addTask',
              ...ancestors,
              columnId,
            });
          }}
          className="column__controls_add"
        >
          <i className="fa-solid fa-plus" />
        </button>
      </div>
      <div className="column__info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <ColumnContent data={objectToArray(data)} columnId={columnId} />
    </StyledColumn>
  );
}

export default Column;
