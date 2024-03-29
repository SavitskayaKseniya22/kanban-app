import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditColumnMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../contexts/modalContext';
import { BasicEntityInfo, BoardId, ColumnId, TokenId, UserId } from '../../../interfaces';

function EditColumn({ ids }: { ids: UserId & BoardId & ColumnId & TokenId }) {
  const [editColumn] = useEditColumnMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    editColumn({ ids, formData });
    modalContext.setModalData(undefined);
  };
  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default EditColumn;
