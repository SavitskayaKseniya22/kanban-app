import React from 'react';
import styled from 'styled-components';
import LanguagePanel from './LanguagePanel';

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
`;

function Header() {
  return (
    <StyledHeader>
      <LanguagePanel />
    </StyledHeader>
  );
}

export default Header;
