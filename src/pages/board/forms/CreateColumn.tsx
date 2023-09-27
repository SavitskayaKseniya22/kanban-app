import React from 'react';
import { useAddColumnMutation } from '../../../store/kanban/kanbanApi';
import { BasicEntityInfo, BoardId, UserId } from '../../../interfaces';
import ModalContext from '../../../context';
import EntityCreationForm from './EntityCreationForm';

function CreateColumn({ ids }: { ids: UserId & BoardId }) {
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
