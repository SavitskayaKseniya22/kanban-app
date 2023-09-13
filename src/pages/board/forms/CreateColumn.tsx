import React from 'react';
import { useAddColumnMutation } from '../../../store/kanban/kanbanApi';
import { ColumnTypes } from '../../../interfaces';
import ModalContext from '../../../context';
import EntityCreationForm from './EntityCreationForm';

function CreateColumn({
  userId,
  boardId,
  data,
}: {
  userId: string;
  boardId: string;
  data: ColumnTypes[];
}) {
  const [addColumn] = useAddColumnMutation();

  const modalContext = React.useContext(ModalContext);

  const onSubmit = (title: string, description: string) => {
    const columnId = Date.now().toString();
    const passedOrder = data[data.length - 1]?.order;
    if (title && description) {
      addColumn({
        userId,
        boardId,
        data: {
          [columnId]: {
            columnId,
            title,
            description,
            order: passedOrder >= 0 ? passedOrder + 1 : 0,
            ancestors: {
              boardId,
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

export default CreateColumn;
