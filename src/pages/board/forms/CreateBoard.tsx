import React from 'react';
import { useAddBoardMutation } from '../../../store/kanban/kanbanApi';
import EntityCreationForm from './EntityCreationForm';

function CreateBoard({ userId }: { userId: string }) {
  const [addBoard] = useAddBoardMutation();

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
    }
  };

  return <EntityCreationForm onSubmitRef={onSubmit} />;
}

export default CreateBoard;
