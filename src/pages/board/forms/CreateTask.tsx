import React, { useEffect, useRef, useState } from 'react';
import { useAddTaskMutation } from '../../../store/kanban/kanbanApi';
import { TaskTypes } from '../../../interfaces';
import EntityCreationForm, { FormValues } from './EntityCreationForm';

function CreateTask({
  userId,
  boardId,
  columnId,
  data,
}: {
  userId: string;
  boardId: string;
  columnId: string;
  data: TaskTypes[] | undefined;
}) {
  const [addTask] = useAddTaskMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dataRef = useRef<FormValues>({ title: '', description: '' });

  useEffect(() => {
    const taskId = Date.now().toString();
    const { title, description } = dataRef.current;
    if (title && description && isSubmitted) {
      addTask({
        userId,
        columnId,
        boardId,
        data: {
          [taskId]: {
            taskId,
            title,
            description,
            order: (data?.at(-1)?.order || -1) + 1,
            ancestors: {
              columnId,
              boardId,
              userId,
            },
          },
        },
      });
      setIsSubmitted(false);
    }
  }, [addTask, boardId, columnId, data, isSubmitted, userId]);

  return <EntityCreationForm dataRef={dataRef} setIsSubmitted={setIsSubmitted} />;
}

export default CreateTask;
