/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import i18next from 'i18next';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const StyledLanguagePanel = styled('form')`
  display: flex;
  margin: 0 auto 0 10rem;

  input {
    display: none;
  }

  label {
    width: 4rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: white;
    color: #7953f5;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
    font-weight: 400;
    transition: 0.5s;
  }

  .language__label_pseudo::after {
    content: 'Ru';
    box-sizing: border-box;
    width: 4rem;
    padding: 0.5rem 1rem;
    position: absolute;
    top: 0;
    left: 4rem;
    background-color: #ed4a44;
    color: white;
    transition: 0.5s;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input:checked + .language__label_pseudo::after {
    content: 'En';
    left: 0;
  }
`;

function LanguagePanel() {
  const { language, changeLanguage } = i18next;
  const { register, watch } = useForm({
    defaultValues: {
      language,
    },
  });

  const watchLang = watch('language', language);

  useEffect(() => {
    if (language !== watchLang) {
      changeLanguage(watchLang);
    }
  }, [changeLanguage, language, watchLang]);

  return (
    <StyledLanguagePanel>
      <input type="radio" {...register('language')} id="en" value="en" />
      <label htmlFor="en" className="language__label_pseudo">
        En
      </label>
      <input type="radio" {...register('language')} id="ru" value="ru" />
      <label htmlFor="ru">Ru</label>
    </StyledLanguagePanel>
  );
}

export default LanguagePanel;
