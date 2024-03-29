/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { Id, toast } from 'react-toastify';
import { useSignInMutation, useSignUpMutation } from '../../store/auth/authApi';
import backAuthPic from '../../assets/images/png/image_processing.png';
import { StyledForm, StyledInput, StyledButtonList } from '../../styledComponents/SharedStyles';
import { AuthTypes } from '../../interfaces';

const StyledAuthPage = styled('main')`
  align-items: center;
  justify-content: center;
  background: no-repeat bottom right/40% scroll url(${backAuthPic});
`;

export function AuthForm({ formType }: { formType: 'login' | 'registration' }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthTypes>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });
  const { t } = useTranslation();

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const emailToastId = React.useRef<null | Id>(null);
  const passwordToastId = React.useRef<null | Id>(null);

  useEffect(() => {
    if (emailToastId.current) {
      toast.dismiss(emailToastId.current);
    }
    if (errors.email) {
      emailToastId.current = toast.warn(
        <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />,
        {
          autoClose: false,
        }
      );
    }
  }, [errors, errors.email]);

  useEffect(() => {
    if (passwordToastId.current) {
      toast.dismiss(passwordToastId.current);
    }

    if (errors.password) {
      passwordToastId.current = toast.warn(
        <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />,
        {
          autoClose: false,
        }
      );
    }
  }, [errors, errors.password]);

  const onSubmit: SubmitHandler<AuthTypes> = (formData) => {
    if (formType === 'login') {
      signIn(formData);
    } else {
      signUp(formData)
        .unwrap()
        .then(() => {
          signIn(formData);
        })
        .catch((rejected) => {
          console.error(rejected);
        });
    }
  };

  return (
    <StyledAuthPage>
      <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledInput
          type="email"
          placeholder={t('auth.email')}
          {...register('email', {
            required: {
              value: true,
              message: `Email: ${t('formValidation.required')}`,
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: `Email: ${t('formValidation.email')}`,
            },
          })}
        />
        <StyledInput
          type="password"
          placeholder={t('auth.password')}
          {...register('password', {
            required: {
              value: true,
              message: `Password: ${t('formValidation.required')}`,
            },
            minLength: {
              value: 5,
              message: `Password: ${t('formValidation.short')}`,
            },
          })}
        />
        <StyledButtonList>
          <button type="submit" className="login__submit" title={t('header.login')}>
            {t('header.login')}
          </button>
          {formType === 'login' ? (
            <NavLink to="/auth/registration" title={t('header.signup')}>
              {t('header.signup')}
            </NavLink>
          ) : (
            <NavLink to="/auth/login" title={t('header.signin')}>
              {t('header.signin')}
            </NavLink>
          )}
        </StyledButtonList>
      </StyledForm>
    </StyledAuthPage>
  );
}

export default AuthForm;
