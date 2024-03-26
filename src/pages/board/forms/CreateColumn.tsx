import React from 'react';
import { useAddColumnMutation } from '../../../store/kanban/kanbanApi';
import { BasicEntityInfo, BoardId, TokenId, UserId } from '../../../interfaces';
import ModalContext from '../../../contexts/modalContext';
import EntityCreationForm from './EntityCreationForm';

function CreateColumn({ ids }: { ids: UserId & BoardId & TokenId }) {
  const [addColumn] = useAddColumnMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    const id = Date.now().toString();
    addColumn({
      ids,
      data: {
        [id]: {
          id,
          order: +id,
          ancestors: ids,
          data: {},
          ...formData,
        },
      },
    });

    modalContext.setModalData(undefined);
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default CreateColumn;
