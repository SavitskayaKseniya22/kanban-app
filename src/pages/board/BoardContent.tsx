/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { DropResult, DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ActiveUserTypes, ColumnTypes } from '../../interfaces';
import Column from './Column';
import { useEditAllBoardMutation } from '../../store/kanban/kanbanApi';
import {
  arrayToObject,
  constructSortedArray,
  objectToArray,
  reassignOrder,
  reorder,
} from '../../utils';
import { useAppSelector } from '../../store/store';

const StyledBoardContent = styled('ul')`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  overflow-x: auto;
  width: 100%;
`;

function BoardContent({ data }: { data: ColumnTypes[] }) {
  const { activeUser } = useAppSelector((state) => state.persist.user);
  const { idToken } = activeUser as ActiveUserTypes;
  const [columns, setColumns] = useState<ColumnTypes[]>(data);
  const [editAllBoard] = useEditAllBoardMutation();

  const isReordered = useRef(false);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  useEffect(() => {
    if (isReordered.current) {
      editAllBoard({ ids: { ...columns[0].ancestors, idToken }, data: arrayToObject(columns) });
      isReordered.current = false;
    }
  }, [columns, editAllBoard, idToken]);

  const onDragEnd = (result: DropResult) => {
    const { type, destination, source } = result;
    if (destination) {
      if (type === 'column' && destination.index !== source.index) {
        const reorderedColumns = reorder(columns, source.index, destination.index);
        setColumns(reorderedColumns);
      } else if (
        type === 'task' &&
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        const column = columns.find((column) => column.id === source.droppableId);
        if (column) {
          const restColumns = columns.filter((column) => column.id !== source.droppableId);

          const tasks = objectToArray(column.data);

          const reorderedTasks = reorder(tasks, source.index, destination.index);

          const updatedColumn = { ...column, data: arrayToObject(reorderedTasks) };

          const sortedColumns = constructSortedArray(restColumns, updatedColumn);

          setColumns(sortedColumns);
        }
      } else if (type === 'task' && destination.droppableId !== source.droppableId) {
        const sourceColumn = columns.find((column) => column.id === source.droppableId);
        const destinationColumn = columns.find((column) => column.id === destination.droppableId);

        if (sourceColumn && destinationColumn) {
          const restColumns = columns.filter(
            (column) => column.id !== source.droppableId && column.id !== destination.droppableId
          );

          const sourceTasks = objectToArray(sourceColumn.data);
          const destinationTasks = objectToArray(destinationColumn.data);

          const [elem] = sourceTasks.splice(source.index, 1);

          destinationTasks.splice(destination.index, 0, {
            ...elem,
            ancestors: { ...elem.ancestors, columnId: destination.droppableId },
          });

          const reorderedSourceTasks = reassignOrder(sourceTasks);
          const sourceColumnCopy = { ...sourceColumn, data: arrayToObject(reorderedSourceTasks) };

          const reorderedDestinationTasks = reassignOrder(destinationTasks);
          const destinationColumnCopy = {
            ...destinationColumn,
            data: arrayToObject(reorderedDestinationTasks),
          };

          const sortedColumns = constructSortedArray(
            restColumns,
            sourceColumnCopy,
            destinationColumnCopy
          );

          setColumns(sortedColumns);
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
