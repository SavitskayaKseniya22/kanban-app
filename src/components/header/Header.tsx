import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import LanguagePanel from './LanguagePanel';
import { StyledButtonDefault } from '../../styledComponents/SharedStyles';
import { RootState } from '../../store/store';
import { resetActiveUser } from '../../store/auth/authSlice';
import Logo from './Logo';

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7953f5;
  padding: 0.5rem;
  gap: 1rem;

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
    padding: 0.5rem 3rem;
  }

  .header__button_signin {
    background-color: #fca311;
    color: white;
  }
`;

function Header() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <StyledHeader>
      <Logo />
      <LanguagePanel />
      {activeUser ? (
        <>
          <button
            type="button"
            className="header__button_logout"
            onClick={() => {
              dispatch(resetActiveUser());
            }}
          >
            {t('header.logout')}
          </button>
          {location.pathname !== '/boards' && (
            <Link to="/boards" className="header__button_go-board">
              {t('header.goBoard')}
            </Link>
          )}
        </>
      ) : (
        <>
          <Link to="/auth/login" className="header__button_signin">
            {t('header.signin')}
          </Link>
          <Link to="/auth/registration" className="header__button_signup">
            {t('header.signup')}
          </Link>
        </>
      )}
    </StyledHeader>
  );
}

export default Header;
