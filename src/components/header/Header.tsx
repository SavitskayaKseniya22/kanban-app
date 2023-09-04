import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import LanguagePanel from './LanguagePanel';

const StyledButtonDefault = css`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: 0.5s;
  border: 2px solid transparent;
  text-decoration: none;

  &:hover {
    transition: 0.5s;
    border-top: 2px solid #fca311;
  }
`;

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
  background-color: #7953f5;
  padding: 1rem;
  gap: 1rem;

  .header__button_signin,
  .header__button_signup {
    ${StyledButtonDefault}
    text-align: center;
    font-weight: 400;
    background-color: white;
    color: #7953f5;
    transition: 0.5s;
  }

  .header__button_signin {
    margin-left: auto;
  }
`;

function Header() {
  const { t } = useTranslation();

  return (
    <StyledHeader>
      <LanguagePanel />
      <Link to="/signin" className="header__button_signin">
        {t('header.signin')}
      </Link>
      <Link to="/signup" className="header__button_signup">
        {t('header.signup')}
      </Link>
    </StyledHeader>
  );
}

export default Header;
