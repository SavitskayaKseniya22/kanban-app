import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledButtonDefault } from '../../styledComponents/SharedStyles';

const StyledSearchPanel = styled('form')`
  display: flex;
  width: 350px;

  input {
    padding: 0.5rem 1rem;
    flex-grow: 1;
    border: none;
  }

  button {
    ${StyledButtonDefault}
    color: #ed4a44;
    background-color: white;
    border: none;
    &:hover {
      border: none;
      color: #fca311;
    }
  }
`;

function SearchPanel() {
  const { t } = useTranslation();
  return (
    <StyledSearchPanel>
      <input type="text" placeholder={t('header.search')} />
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </StyledSearchPanel>
  );
}

export default SearchPanel;
