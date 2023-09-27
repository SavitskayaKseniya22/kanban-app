import React from 'react';
import { useAddBoardMutation } from '../../../store/kanban/kanbanApi';
import EntityCreationForm from './EntityCreationForm';
import ModalContext from '../../../context';
import { BasicEntityInfo, UserId } from '../../../interfaces';

function CreateBoard({ ids }: { ids: UserId }) {
  const [addBoard] = useAddBoardMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (formData: BasicEntityInfo) => {
    const id = Date.now().toString();
    addBoard({
      ...ids,
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

export default CreateBoard;
