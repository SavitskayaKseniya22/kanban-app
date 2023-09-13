import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditBoardMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../context';

function EditBoard({ userId, boardId }: { userId: string; boardId: string }) {
  const [editBoard] = useEditBoardMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (title: string, description: string) => {
    if (title && description) {
      editBoard({
        userId,
        boardId,
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

export default EditBoard;
