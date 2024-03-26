import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditBoardMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../contexts/modalContext';
import { BasicEntityInfo, BoardId, TokenId, UserId } from '../../../interfaces';

function EditBoard({ ids }: { ids: UserId & BoardId & TokenId }) {
  const [editBoard] = useEditBoardMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    editBoard({ ids, formData });

    modalContext.setModalData(undefined);
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default EditBoard;
