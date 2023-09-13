/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Form, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { Id, toast } from 'react-toastify';
import { useSignInMutation, useSignUpMutation } from '../../store/auth/authApi';
import { StyledButtonDefault } from '../../styledComponents/SharedStyles';
import backAuthPic from '../../assets/images/png/image_processing.png';

const StyledAuthPage = styled('main')`
  align-items: center;
  justify-content: center;
  background: no-repeat bottom right/40% scroll url(${backAuthPic});
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(230, 230, 230, 0.6);
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 2rem;
  width: 300px;
  & > * {
    width: 100%;
  }
`;

export const StyledInput = styled('input')`
  padding: 0.5rem;
  color: black;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 0.5rem;
`;

export const StyledButton = styled('button')`
  ${StyledButtonDefault}
  background-color:#ed4a44;
  color: white;
  flex-grow: 1;
  text-align: center;
`;

export const StyledButtonList = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
  & > * {
    ${StyledButtonDefault}
    background-color:#7953f5;
    color: white;
    flex-grow: 1;
    text-align: center;
  }
  .login__submit {
    background-color: #ed4a44;
  }
`;

export function AuthForm({ formType }: { formType: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      toast.dismiss(emailToastId.current as Id);
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
      toast.dismiss(passwordToastId.current as Id);
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

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const { email, password } = formData;
    if (formType === 'login') {
      signIn({ email, password });
    } else if (formType === 'registration') {
      signUp({ email, password })
        .unwrap()
        .then(() => {
          signIn({ email, password });
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
          placeholder="email"
          defaultValue=""
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
          placeholder="password"
          defaultValue=""
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
          <button type="submit" className="login__submit">
            Enter
          </button>
          {formType === 'login' && <NavLink to="/auth/registration">Registration</NavLink>}
          {formType === 'registration' && <NavLink to="/auth/login">Login</NavLink>}
        </StyledButtonList>
      </StyledForm>
    </StyledAuthPage>
  );
}

export default AuthForm;
