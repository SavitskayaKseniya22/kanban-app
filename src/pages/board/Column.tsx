import React from 'react';
import styled from 'styled-components';

import { ColumnDataTypes, ColumnTypes } from '../../interfaces';
import { StyledIconButton } from '../../styledComponents/SharedStyles';
import { useAddTaskMutation, useDeleteColumnMutation } from '../../store/kanban/kanbanApi';
import ColumnContent from './ColumnContent';

const StyledColumn = styled('li')`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 350px;
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

export function createTask({
  userId,
  boardId,
  columnId,
}: {
  userId: string;
  boardId: string;
  columnId: string;
}): ColumnDataTypes {
  const taskId = Date.now().toString();

  return {
    [taskId]: {
      taskId,
      title: taskId,
      description: 'string',
      order: 1,
      ancestors: {
        columnId,
        boardId,
        userId,
      },
    },
  };
}

function Column({ columnProp }: { columnProp: ColumnTypes }) {
  const { title, description, data, columnId, ancestors } = columnProp;
  const { userId, boardId } = ancestors;
  const [addTask] = useAddTaskMutation();
  const [deleteColumn] = useDeleteColumnMutation();
  return (
    <StyledColumn>
      <div className="column__controls">
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
            deleteColumn({ userId, columnId, boardId });
          }}
          className="column__controls_delete"
        >
          <i className="fa-solid fa-trash-can" />
        </button>
        <button
          type="button"
          onClick={() => {
            addTask({
              userId,
              columnId,
              boardId,
              data: createTask({
                userId,
                columnId,
                boardId,
              }),
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
      {data && <ColumnContent data={data} />}
    </StyledColumn>
  );
}

export default Column;
