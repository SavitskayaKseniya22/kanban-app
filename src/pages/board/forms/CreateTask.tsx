import React from 'react';
import { useAddTaskMutation } from '../../../store/kanban/kanbanApi';
import { BasicEntityInfo, BoardId, ColumnId, UserId } from '../../../interfaces';
import ModalContext from '../../../context';
import EntityCreationForm from './EntityCreationForm';

function CreateTask({ ids }: { ids: UserId & BoardId & ColumnId }) {
  const [addTask] = useAddTaskMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    const id = Date.now().toString();
    addTask({
      ids,
      data: {
        [id]: {
          id,
          order: +id,
          ancestors: ids,
          ...formData,
        },
      },
    });

    modalContext.setModalData(undefined);
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default CreateTask;
