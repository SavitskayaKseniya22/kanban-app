import React, { useEffect, useRef, useState } from 'react';
import { useAddBoardMutation } from '../../../store/kanban/kanbanApi';
import EntityCreationForm from './EntityCreationForm';

type FormValues = {
  title: string;
  description: string;
};

function CreateBoard({ userId }: { userId: string }) {
  const [addBoard] = useAddBoardMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dataRef = useRef<FormValues>({ title: '', description: '' });

  useEffect(() => {
    const boardId = Date.now().toString();
    const { title, description } = dataRef.current;
    if (title && description && isSubmitted) {
      addBoard({
        userId,
        data: {
          [boardId]: {
            boardId,
            title,
            description,
            order: 1,
            ancestors: {
              userId,
            },
            data: {},
          },
        },
      });
      setIsSubmitted(false);
    }
  }, [addBoard, isSubmitted, userId]);

  return <EntityCreationForm dataRef={dataRef} setIsSubmitted={setIsSubmitted} />;
}

export default CreateBoard;
