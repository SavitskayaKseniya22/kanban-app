/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ActiveUserTypes, TaskTypes } from '../../interfaces';
import { StyledIconButton } from '../../styledComponents/SharedStyles';
import { useDeleteTaskMutation } from '../../store/kanban/kanbanApi';
import ModalContext from '../../contexts/modalContext';
import { useAppSelector } from '../../store/store';

const StyledTask = styled('li')`
  display: flex;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  align-items: center;
  gap: 1rem;

  .task__info {
    flex-grow: 2;
    text-align: left;

    h4 {
      border-bottom: 1px solid #e5e5e5;
    }

    & > * {
      padding: 0.5rem;
    }
  }

  .task__controls {
    display: flex;
    flex-direction: column;

    button {
      ${StyledIconButton}
    }
  }
`;

function Task({ task }: { task: TaskTypes }) {
  const { title, description, ancestors, id: taskId } = task;

  const { activeUser } = useAppSelector((state) => state.persist.user);
  const { idToken } = activeUser as ActiveUserTypes;

  const [deleteTask] = useDeleteTaskMutation();
  const modalContext = React.useContext(ModalContext);

  const { t } = useTranslation();

  return (
    <StyledTask>
      <div className="task__info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className="task__controls">
        <button
          type="button"
          title={t('data.editTask')}
          onClick={() => {
            modalContext.setModalData({
              type: 'editTask',
              ...ancestors,
              taskId,
            });
          }}
        >
          <i className="fa-solid fa-pen" />
        </button>

        <button
          type="button"
          title={t('data.deleteTask')}
          onClick={() => {
            deleteTask({ ...ancestors, taskId, idToken });
          }}
        >
          <i className="fa-solid fa-trash-can" />
        </button>
      </div>
    </StyledTask>
  );
}

export default Task;
