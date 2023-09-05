import { css } from 'styled-components';

export const StyledButtonDefault = css`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: 0.5s;
  border: 2px solid transparent;
  text-decoration: none;
  transition: 0.5s;

  &:hover {
    transition: 0.5s;
    border-top: 2px solid #fca311;
  }
`;

export const StyledIconButton = css`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: transparent;
  transition: color 0.5s;
  border: none;

  &:hover {
    color: #fca311;
    transition: 0.5s;
  }
`;
