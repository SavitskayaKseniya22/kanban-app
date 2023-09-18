import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/png/Todoist_logo.png';

export const StyledLogo = styled(NavLink)`
  display: flex;
  width: 120px;

  img {
    width: 100%;
  }
`;

function Logo() {
  return (
    <StyledLogo to="/">
      <img src={logo} alt="Todoist" />
    </StyledLogo>
  );
}

export default Logo;
