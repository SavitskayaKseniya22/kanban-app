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
`;

function BoardContent({ data }: { data: ColumnTypes[] }) {
  const [columns, setColumns] = useState<ColumnTypes[]>(data);
  const [editAllBoard] = useEditAllBoardMutation();

  const isReordered = useRef(false);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  useEffect(() => {
    if (columns.length > 0 && isReordered.current) {
      const { userId, boardId } = columns[0].ancestors;
      const obj: BoardDataTypes = {};
      columns.forEach((item) => {
        obj[item.columnId] = item as ColumnTypes;
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
    if (columns.length > 0 && destination) {
      if (type === 'column') {
        const reorderedColumns = reorder(columns, source.index, destination.index) as ColumnTypes[];
        setColumns(reorderedColumns);
      } else if (type === 'task' && destination.droppableId === source.droppableId) {
        const column = columns.filter((item) => item.columnId === source.droppableId)[0];
        const { data } = column;

        const tasks = Object.keys(data)
          .map((task) => data[task])
          .sort((a, b) => a.order - b.order);

        const reorderedTasks = reorder(tasks, source.index, destination.index) as TaskTypes[];

        const columnCopy = { ...column };
        columnCopy.data = {};

        reorderedTasks.forEach((item) => {
          columnCopy.data[item.taskId] = item as TaskTypes;
        });

        const updatedColumns = columns
          .filter((item) => item.columnId !== source.droppableId)
          .concat(columnCopy)
          .sort((a, b) => a.order - b.order);

        setColumns(updatedColumns);
      } else if (type === 'task' && destination.droppableId !== source.droppableId) {
        const sourceColumn = columns.filter((item) => item.columnId === source.droppableId)[0];

        const sourceTasks = Object.keys(sourceColumn.data || [])
          .map((task) => sourceColumn.data[task])
          .sort((a, b) => a.order - b.order);

        const destinationColumn = columns.filter(
          (item) => item.columnId === destination.droppableId
        )[0];

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
        });

        const reorderedDestinationTasks = destinationTasks.map((item, index) => {
          const copyItem = { ...item };
          copyItem.order = index;
          return copyItem;
        });

        const sourceColumnCopy = { ...sourceColumn };
        sourceColumnCopy.data = {};

        reorderedSourceTasks.forEach((item) => {
          sourceColumnCopy.data[item.taskId] = item as TaskTypes;
        });

        const destinationColumnCopy = { ...destinationColumn };
        destinationColumnCopy.data = {};

        reorderedDestinationTasks.forEach((item) => {
          destinationColumnCopy.data[item.taskId] = item as TaskTypes;
        });

        const updatedColumns = columns
          .filter(
            (item) =>
              item.columnId !== source.droppableId && item.columnId !== destination.droppableId
          )
          .concat(sourceColumnCopy)
          .concat(destinationColumnCopy)
          .sort((a, b) => a.order - b.order);

        setColumns(updatedColumns);
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
