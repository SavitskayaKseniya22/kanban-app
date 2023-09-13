import React from 'react';
import { useAddTaskMutation } from '../../../store/kanban/kanbanApi';
import { TaskTypes } from '../../../interfaces';
import ModalContext from '../../../context';
import EntityCreationForm from './EntityCreationForm';

function CreateTask({
  userId,
  boardId,
  columnId,
  data,
}: {
  userId: string;
  boardId: string;
  columnId: string;
  data: TaskTypes[];
}) {
  const [addTask] = useAddTaskMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (title: string, description: string) => {
    const taskId = Date.now().toString();

    const passedOrder = data[data.length - 1]?.order;

    if (title && description) {
      addTask({
        userId,
        columnId,
        boardId,
        data: {
          [taskId]: {
            taskId,
            title,
            description,
            order: passedOrder >= 0 ? passedOrder + 1 : 0,
            ancestors: {
              columnId,
              boardId,
              userId,
            },
          },
        },
      });

      modalContext.setModalData(undefined);
    }
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default CreateTask;
