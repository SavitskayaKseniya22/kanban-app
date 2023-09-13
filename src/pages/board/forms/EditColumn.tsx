import React from 'react';
import EntityCreationForm from './EntityCreationForm';
import { useEditColumnMutation } from '../../../store/kanban/kanbanApi';
import ModalContext from '../../../context';

function EditColumn({
  userId,
  boardId,
  columnId,
}: {
  userId: string;
  boardId: string;
  columnId: string;
}) {
  const [editColumn] = useEditColumnMutation();
  const modalContext = React.useContext(ModalContext);

  const onSubmit = (title: string, description: string) => {
    if (title && description) {
      editColumn({
        userId,
        boardId,
        columnId,
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

export default EditColumn;
