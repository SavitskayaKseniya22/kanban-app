/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
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
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const titleToastId = React.useRef<null | Id>(null);
  const descriptionToastId = React.useRef<null | Id>(null);

  useEffect(() => {
    if (titleToastId.current) {
      toast.dismiss(titleToastId.current as Id);
    }
    if (errors.title) {
      titleToastId.current = toast.warn(
        <ErrorMessage errors={errors} name="title" render={({ message }) => <p>{message}</p>} />,
        {
          autoClose: false,
        }
      );
    }
  }, [errors, errors.title]);

  useEffect(() => {
    if (descriptionToastId.current) {
      toast.dismiss(descriptionToastId.current as Id);
    }
    if (errors.description) {
      descriptionToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        }
      );
    }
  }, [errors, errors.description]);

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
          required: {
            value: true,
            message: `Title: ${t('formValidation.required')}`,
          },
        })}
      />
      <StyledInput
        type="text"
        placeholder="description"
        {...register('description', {
          required: {
            value: true,
            message: `Description: ${t('formValidation.required')}`,
          },
        })}
      />
      <StyledButton type="submit">Send</StyledButton>
    </StyledForm>
  );
}

export default EntityCreationForm;
