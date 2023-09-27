import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditTaskMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../context';
import { BasicEntityInfo, BoardId, ColumnId, TaskId, UserId } from '../../../interfaces';

function EditTask({ ids }: { ids: UserId & BoardId & ColumnId & TaskId }) {
  const [editTask] = useEditTaskMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    editTask({ ids, formData });
    modalContext.setModalData(undefined);
  };
  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default EditTask;
