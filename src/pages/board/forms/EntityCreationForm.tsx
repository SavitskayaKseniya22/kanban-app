/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyledForm, StyledInput, StyledButton } from '../../../styledComponents/SharedStyles';

export type FormValues = {
  title: string;
  description: string;
};

function EntityCreationForm({
  onSubmitRef,
}: {
  onSubmitRef: (title: string, description: string) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const { title, description } = formData;

    onSubmitRef(title, description);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        type="text"
        placeholder="title"
        {...register('title', {
          required: 'Please enter title',
        })}
      />
      <StyledInput
        type="text"
        placeholder="description"
        {...register('description', {
          required: 'Please enter description',
        })}
      />
      <StyledButton type="submit">Send</StyledButton>
    </StyledForm>
  );
}

export default EntityCreationForm;
