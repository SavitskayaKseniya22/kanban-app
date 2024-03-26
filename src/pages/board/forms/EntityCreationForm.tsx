/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import { StyledForm, StyledInput, StyledButton } from '../../../styledComponents/SharedStyles';
import { BasicEntityInfo } from '../../../interfaces';

function EntityCreationForm({ onSubmitRef }: { onSubmitRef: (prop: BasicEntityInfo) => void }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<BasicEntityInfo>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const titleToastId = React.useRef<null | Id>(null);
  const descriptionToastId = React.useRef<null | Id>(null);

  useEffect(() => {
    if (titleToastId.current) {
      toast.dismiss(titleToastId.current);
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
      toast.dismiss(descriptionToastId.current);
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

  const onSubmit: SubmitHandler<BasicEntityInfo> = (formData) => {
    onSubmitRef(formData);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        type="text"
        placeholder={t('header.title')}
        {...register('title', {
          required: {
            value: true,
            message: `${t('header.title')}: ${t('formValidation.required')}`,
          },
        })}
      />
      <StyledInput
        type="text"
        placeholder={t('header.description')}
        {...register('description', {
          required: {
            value: true,
            message: `${t('header.description')}: ${t('formValidation.required')}`,
          },
        })}
      />
      <StyledButton type="submit">{t('header.send')}</StyledButton>
    </StyledForm>
  );
}

export default EntityCreationForm;
