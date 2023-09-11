/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type FormValues = {
  title: string;
  description: string;
};

function EntityCreationForm({
  dataRef,
  setIsSubmitted,
}: {
  dataRef: React.MutableRefObject<FormValues>;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const { title, description } = formData;
    if (title && description) {
      dataRef.current = formData;
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="title"
        {...register('title', {
          required: 'Please enter title',
        })}
      />
      <input
        type="text"
        placeholder="description"
        {...register('description', {
          required: 'Please enter description',
        })}
      />
      <button type="submit">send</button>
    </form>
  );
}

export default EntityCreationForm;
