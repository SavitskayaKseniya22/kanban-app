import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/png/Todoist_logo.png';

export const StyledLogo = styled(NavLink)`
  display: flex;
  width: 120px;

  img {
    width: 100%;
  }
`;

function Logo() {
  const { t } = useTranslation();

  return (
    <StyledLogo to="/" title={t('header.goMain')}>
      <img src={logo} alt="Todoist" />
    </StyledLogo>
  );
}

export default Logo;
