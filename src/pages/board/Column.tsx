import React from 'react';
import styled from 'styled-components';
import { ColumnTypes } from '../../interfaces';
import Task from './Task';
import { StyledIconButton } from '../../styledComponents/SharedStyles';

const StyledColumn = styled('div')`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 450px;
  padding: 1rem;
  gap: 1rem;
  background-color: rgba(230, 230, 230, 0.6);

  .column__tasks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    h3 {
      cursor: text;
    }
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
  const { name, description, data } = columnProp;
  return (
    <StyledColumn>
      <div className="column__controls">
        <button
          type="button"
          onClick={() => {
            console.log('edit');
          }}
          className="column__controls_delete"
        >
          <i className="fa-solid fa-trash-can" />
        </button>

        <button
          type="button"
          onClick={() => {
            console.log('edit');
          }}
          className="column__controls_add"
        >
          <i className="fa-solid fa-plus" />
        </button>
      </div>
      <div className="column__info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      <ul className="column__tasks">
        {data &&
          Array.from(Object.keys(data)).map((taskItemId) => (
            <Task taskProp={data[taskItemId]} key={taskItemId + Date.now()} />
          ))}
      </ul>
    </StyledColumn>
  );
}

export default Column;
