/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskTypes } from '../../interfaces';
import Task from './Task';

function ColumnContent({ data, columnId }: { data: TaskTypes[]; columnId: string }) {
  return (
    <Droppable droppableId={columnId} direction="vertical" type="task">
      {(provided) => (
        <ul className="column__tasks" ref={provided.innerRef} {...provided.droppableProps}>
          {data.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Task task={task} />
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
