import React from 'react';
import styled from 'styled-components';
import { TaskTypes } from '../../interfaces';
import { StyledIconButton } from '../../styledComponents/SharedStyles';
import { useDeleteTaskMutation } from '../../store/kanban/kanbanApi';
import ModalContext from '../../context';

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

function Task({ taskProp }: { taskProp: TaskTypes }) {
  const { title, description, ancestors, taskId } = taskProp;
  const { columnId, boardId, userId } = ancestors;
  const [deleteTask] = useDeleteTaskMutation();
  const modalContext = React.useContext(ModalContext);

  return (
    <StyledTask>
      <div className="task__info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className="task__controls">
        <button
          type="button"
          onClick={() => {
            modalContext.setModalData({
              type: 'editTask',
              userId,
              boardId,
              columnId,
              taskId,
            });
          }}
        >
          <i className="fa-solid fa-pen" />
        </button>

        <button
          type="button"
          onClick={() => {
            deleteTask({ userId, boardId, columnId, taskId });
          }}
        >
          <i className="fa-solid fa-trash-can" />
        </button>
      </div>
    </StyledTask>
  );
}

export default Task;
