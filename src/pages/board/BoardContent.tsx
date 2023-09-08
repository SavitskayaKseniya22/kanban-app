/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { DropResult, DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoardDataTypes, ColumnTypes } from '../../interfaces';
import { useReplaceBoardContentMutation } from '../../store/kanban/kanbanApi';
import Column from './Column';

const StyledBoardContent = styled('ul')`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  overflow-x: auto;
`;

function BoardContent({ data }: { data: ColumnTypes[] }) {
  const [columns, setColumns] = useState(data);
  const [replaceBoardContent] = useReplaceBoardContentMutation();

  useEffect(() => {
    setColumns(data);
  }, [data]);

  const reorder = (list: ColumnTypes[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (columns) {
      const items = reorder(columns, result.source.index, result.destination.index).map(
        (item, index) => {
          const copyItem = { ...item };
          copyItem.order = index;
          return copyItem;
        }
      );
      setColumns(items);
      const { userId, boardId } = items[0].ancestors;
      const obj: BoardDataTypes = {};
      items.forEach((item) => {
        obj[item.columnId] = item;
      });

      replaceBoardContent({ userId, boardId, data: obj });
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
