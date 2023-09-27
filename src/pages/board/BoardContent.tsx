/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { DropResult, DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BoardDataTypes, ColumnTypes, TaskTypes } from '../../interfaces';
import Column from './Column';
import { useEditAllBoardMutation } from '../../store/kanban/kanbanApi';

const StyledBoardContent = styled('ul')`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  overflow-x: auto;
  width: 100%;
`;

function BoardContent({ data }: { data: ColumnTypes[] }) {
  const [columns, setColumns] = useState<ColumnTypes[]>(data);
  const [editAllBoard] = useEditAllBoardMutation();

  const isReordered = useRef(false);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  useEffect(() => {
    if (isReordered.current) {
      const { userId, boardId } = columns[0].ancestors;
      const obj: BoardDataTypes = {};
      columns.forEach((column) => {
        obj[column.id] = column;
      });

      editAllBoard({ userId, boardId, data: obj });
      isReordered.current = false;
    }
  }, [columns, editAllBoard]);

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
    const { type, destination, source } = result;
    if (destination) {
      if (type === 'column' && destination.index !== source.index) {
        const reorderedColumns = reorder(columns, source.index, destination.index) as ColumnTypes[];
        setColumns(reorderedColumns);
      } else if (
        type === 'task' &&
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        const column = columns.find((column) => column.id === source.droppableId);
        if (column) {
          const { data } = column;

          const tasks = Object.keys(data)
            .map((task) => data[task])
            .sort((a, b) => a.order - b.order);

          const reorderedTasks = reorder(tasks, source.index, destination.index) as TaskTypes[];

          const columnCopy = { ...column };
          columnCopy.data = {};

          reorderedTasks.forEach((task) => {
            columnCopy.data[task.id] = task;
          });

          const updatedColumns = columns
            .filter((column) => column.id !== source.droppableId)
            .concat(columnCopy)
            .sort((a, b) => a.order - b.order);

          setColumns(updatedColumns);
        }
      } else if (type === 'task' && destination.droppableId !== source.droppableId) {
        const sourceColumn = columns.find((column) => column.id === source.droppableId);
        const destinationColumn = columns.find((column) => column.id === destination.droppableId);
        if (sourceColumn && destinationColumn) {
          const sourceTasks = Object.keys(sourceColumn.data || [])
            .map((task) => sourceColumn.data[task])
            .sort((a, b) => a.order - b.order);

          const destinationTasks = Object.keys(destinationColumn.data || [])
            .map((task) => destinationColumn.data[task])
            .sort((a, b) => a.order - b.order);

          const [elem] = sourceTasks.splice(source.index, 1);

          destinationTasks.splice(destination.index, 0, {
            ...elem,
            ancestors: { ...elem.ancestors, columnId: destination.droppableId },
          });

          const reorderedSourceTasks = sourceTasks.map((item, index) => {
            const copyItem = { ...item };
            copyItem.order = index;
            return copyItem;
          }) as TaskTypes[];

          const reorderedDestinationTasks = destinationTasks.map((item, index) => {
            const copyItem = { ...item };
            copyItem.order = index;
            return copyItem;
          }) as TaskTypes[];

          const sourceColumnCopy = { ...sourceColumn };
          sourceColumnCopy.data = {};

          reorderedSourceTasks.forEach((task) => {
            sourceColumnCopy.data[task.id] = task;
          });

          const destinationColumnCopy = { ...destinationColumn };
          destinationColumnCopy.data = {};

          reorderedDestinationTasks.forEach((task) => {
            destinationColumnCopy.data[task.id] = task;
          });

          const updatedColumns = columns
            .filter(
              (column) => column.id !== source.droppableId && column.id !== destination.droppableId
            )
            .concat(sourceColumnCopy)
            .concat(destinationColumnCopy)
            .sort((a, b) => a.order - b.order);

          setColumns(updatedColumns);
        }
      }
      isReordered.current = true;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columnList" direction="horizontal" type="column">
        {(provided) => (
          <StyledBoardContent ref={provided.innerRef} {...provided.droppableProps}>
            {columns.map((column, index) => {
              const { id } = column;
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Column columnProp={column} key={id} />
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
