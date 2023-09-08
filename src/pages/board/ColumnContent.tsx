/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { ColumnTypes, TaskTypes } from '../../interfaces';
import Task from './Task';

function ColumnContent({ columnProp }: { columnProp: ColumnTypes }) {
  const { data, columnId } = columnProp;
  const [tasks] = useState<TaskTypes[]>(
    Object.keys(data)
      .map((task) => data[task])
      .sort((a, b) => a.order - b.order)
  );

  return (
    <Droppable droppableId={columnId} direction="vertical" type="task">
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
                  <Task taskProp={item} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default ColumnContent;
