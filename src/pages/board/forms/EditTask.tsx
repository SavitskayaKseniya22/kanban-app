import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditTaskMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../context';

function EditTask({
  userId,
  boardId,
  columnId,
  taskId,
}: {
  userId: string;
  boardId: string;
  columnId: string;
  taskId: string;
}) {
  const [editTask] = useEditTaskMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (title: string, description: string) => {
    if (title && description) {
      editTask({
        userId,
        boardId,
        columnId,
        taskId,
        data: {
          title,
          description,
        },
      });

      modalContext.setModalData(undefined);
    }
  };
  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default EditTask;
