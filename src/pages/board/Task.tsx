import React from 'react';
import styled from 'styled-components';
import { TaskTypes } from '../../interfaces';
import { StyledIconButton } from '../../styledComponents/SharedStyles';
import { useDeleteTaskMutation } from '../../store/kanban/kanbanApi';

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
  const { title, description, ancestors, id } = taskProp;
  const { columnId, boardId, userId } = ancestors;
  const [deleteTask] = useDeleteTaskMutation();
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
            console.log('edit');
          }}
        >
          <i className="fa-solid fa-pen" />
        </button>

        <button
          type="button"
          onClick={() => {
            console.log('delete');
            deleteTask({ userId, boardId, columnId, taskId: id });
          }}
        >
          <i className="fa-solid fa-trash-can" />
        </button>
      </div>
    </StyledTask>
  );
}

export default Task;
