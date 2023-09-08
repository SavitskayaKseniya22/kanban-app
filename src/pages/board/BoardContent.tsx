/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { DropResult, DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoardDataTypes, ColumnTypes, TaskTypes } from '../../interfaces';
import { useReplaceBoardContentMutation } from '../../store/kanban/kanbanApi';
import Column from './Column';

const StyledBoardContent = styled('ul')`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  overflow-x: auto;
`;

function BoardContent({ data }: { data: ColumnTypes[] }) {
  const [columns, setColumns] = useState<ColumnTypes[]>(data);
  const [replaceBoardContent] = useReplaceBoardContentMutation();

  useEffect(() => {
    setColumns(data);
  }, [data]);

  useEffect(() => {
    if (columns.length > 0) {
      const { userId, boardId } = columns[0].ancestors;
      const obj: BoardDataTypes = {};
      columns.forEach((item) => {
        obj[item.columnId] = item as ColumnTypes;
      });

      replaceBoardContent({ userId, boardId, data: obj });
    }
  }, [columns, replaceBoardContent]);

  const reorder = (list: ColumnTypes[] | TaskTypes[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, index) => {
      const copyItem = { ...item };
      copyItem.order = index;
      return copyItem;
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (columns.length > 0 && result.type === 'column') {
      const reorderedColumns = reorder(
        columns,
        result.source.index,
        result.destination.index
      ) as ColumnTypes[];
      setColumns(reorderedColumns);
    } else if (columns.length > 0 && result.type === 'task') {
      const column = columns.filter((item) => item.columnId === result.source.droppableId)[0];
      const { data } = column;

      const tasks = Object.keys(data)
        .map((task) => data[task])
        .sort((a, b) => a.order - b.order);

      const reorderedTasks = reorder(
        tasks,
        result.source.index,
        result.destination.index
      ) as TaskTypes[];

      const columnCopy = { ...column };
      columnCopy.data = {};

      reorderedTasks.forEach((item) => {
        columnCopy.data[item.taskId] = item as TaskTypes;
      });

      const updatedColumns = columns
        .filter((item) => item.columnId !== result.source.droppableId)
        .concat(columnCopy)
        .sort((a, b) => a.order - b.order);

      setColumns(updatedColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columnList" direction="horizontal" type="column">
        {(provided) => (
          <StyledBoardContent ref={provided.innerRef} {...provided.droppableProps}>
            {columns.map((column, index) => {
              const { columnId } = column;
              return (
                <Draggable key={columnId} draggableId={columnId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Column columnProp={column} key={columnId + Date.now()} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </StyledBoardContent>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default BoardContent;
