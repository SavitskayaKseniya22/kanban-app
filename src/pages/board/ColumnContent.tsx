/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ColumnDataTypes, TaskTypes } from '../../interfaces';
import Task from './Task';
import { useReplaceColumnContentMutation } from '../../store/kanban/kanbanApi';

function ColumnContent({ data }: { data: ColumnDataTypes }) {
  const [tasks, setTasks] = useState<TaskTypes[]>(
    Object.keys(data)
      .map((task) => data[task])
      .sort((a, b) => a.order - b.order)
  );

  const [replaceColumnContent] = useReplaceColumnContentMutation();

  const reorder = (list: TaskTypes[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // превратить в массив.отсортировать.изменит индексы.отсортировать по новым индексам.

    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index).map(
      (item, index) => {
        const copyItem = { ...item };
        copyItem.order = index;
        return copyItem;
      }
    );
    setTasks(items);
    const { userId, boardId, columnId } = items[0].ancestors;
    const obj: ColumnDataTypes = {};
    items.forEach((item) => {
      obj[item.taskId] = item;
    });
    replaceColumnContent({ userId, boardId, columnId, data: obj });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`${Math.random()}24234`} direction="vertical">
        {(provided) => (
          <ul className="column__tasks" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((item, index) => (
              <Draggable key={item.taskId} draggableId={item.taskId} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.order}
                    <Task taskProp={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ColumnContent;
