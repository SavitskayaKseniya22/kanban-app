import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logoImg from '../../assets/images/png/Todoist_logo.png';

export const StyledLogo = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  width: 120px;
  align-self: center;

  .logo__img {
    width: 100%;
    height: 100%;
  }
`;

function Logo() {
  return (
    <StyledLogo to="/">
      <img src={logoImg} alt="todoist" className="logo__img" />
    </StyledLogo>
  );
}

export default Logo;
