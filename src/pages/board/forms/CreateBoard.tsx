import React from 'react';
import { useAddBoardMutation } from '../../../store/kanban/kanbanApi';
import EntityCreationForm from './EntityCreationForm';
import ModalContext from '../../../context';

function CreateBoard({ userId }: { userId: string }) {
  const [addBoard] = useAddBoardMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (title: string, description: string) => {
    const boardId = Date.now().toString();
    if (title && description) {
      addBoard({
        userId,
        data: {
          [boardId]: {
            boardId,
            title,
            description,
            ancestors: {
              userId,
            },
            data: {},
          },
        },
      });
      modalContext.setModalData(undefined);
    }
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default CreateBoard;
