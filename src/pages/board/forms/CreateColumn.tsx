import React, { useEffect, useRef, useState } from 'react';
import { useAddColumnMutation } from '../../../store/kanban/kanbanApi';
import { ColumnTypes } from '../../../interfaces';
import EntityCreationForm, { FormValues } from './EntityCreationForm';

function CreateColumn({
  userId,
  boardId,
  data,
}: {
  userId: string;
  boardId: string;
  data: ColumnTypes[] | undefined;
}) {
  const [addColumn] = useAddColumnMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dataRef = useRef<FormValues>({ title: '', description: '' });

  useEffect(() => {
    const columnId = Date.now().toString();
    const { title, description } = dataRef.current;

    if (isSubmitted && title && description) {
      addColumn({
        userId,
        boardId,
        data: {
          [columnId]: {
            columnId,
            title,
            description,
            order: (data?.at(-1)?.order || -1) + 1,
            ancestors: {
              boardId,
              userId,
            },
            data: {},
          },
        },
      });
      setIsSubmitted(false);
    }
  }, [addColumn, boardId, data, isSubmitted, userId]);

  return <EntityCreationForm dataRef={dataRef} setIsSubmitted={setIsSubmitted} />;
}

export default CreateColumn;
