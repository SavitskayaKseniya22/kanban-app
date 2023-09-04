import React, { useState } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LanguagePanel from './LanguagePanel';
import SearchPanel from './SearchPanel';
import { StyledButtonDefault } from '../../styledComponents/SharedStyles';

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
  background-color: #7953f5;
  padding: 1rem;
  gap: 1rem;

  .header__button_profile,
  .header__button_logout,
  .header__button_signin,
  .header__button_signup,
  .header__button_go-board {
    ${StyledButtonDefault}
    background-color: white;
    color: #7953f5;
  }

  .header__button_go-board {
    background-color: #ed4a44;
    color: white;
  }
  .header__button_signin,
  .header__button_profile {
    margin-left: auto;
    background-color: #fca311;
    color: white;
  }
`;

const getHeaderContent = (
  isLogin: boolean,
  pathname: string,
  t: TFunction<'translation', undefined>
) => {
  const headerBasic = (
    <>
      <SearchPanel />
      <LanguagePanel />

      <Link to="/profile" className="header__button_profile">
        {t('header.profile')}
      </Link>
      <button type="button" className="header__button_logout">
        {t('header.logout')}
      </button>
    </>
  );

  const headerWithoutLogin = (
    <>
      <LanguagePanel />
      <Link to="/auth/login" className="header__button_signin">
        {t('header.signin')}
      </Link>
      <Link to="/auth/registration" className="header__button_signup">
        {t('header.signup')}
      </Link>
    </>
  );

  const headerWithLoginNotOnBoard = (
    <>
      {headerBasic}
      <Link to="/main" className="header__button_go-board">
        {t('header.goBoard')}
      </Link>
    </>
  );

  if (isLogin) {
    if (pathname !== '/board') {
      return headerWithLoginNotOnBoard;
    }
    return headerBasic;
  }
  return headerWithoutLogin;
};

function Header() {
  const [isLogin] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  return <StyledHeader>{getHeaderContent(isLogin, location.pathname, t)}</StyledHeader>;
}

export default Header;
