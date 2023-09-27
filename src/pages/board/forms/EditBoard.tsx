import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditBoardMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../context';
import { BasicEntityInfo, BoardId, UserId } from '../../../interfaces';

function EditBoard({ ids }: { ids: UserId & BoardId }) {
  const [editBoard] = useEditBoardMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    editBoard({ ids, formData });

    modalContext.setModalData(undefined);
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default EditBoard;
