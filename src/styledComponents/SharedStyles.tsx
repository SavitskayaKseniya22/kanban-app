import { Form } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  background-color: rgba(230, 230, 230, 0.6);
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 2rem;
  width: 300px;
  & > * {
    width: 100%;
  }
`;

export const StyledInput = styled('input')`
  padding: 0.5rem;
  color: black;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 0.5rem;
`;

export const StyledButtonDefault = css`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: 0.5s;
  border: 2px solid transparent;
  text-decoration: none;
  transition: 0.5s;
  color: white;
  text-align: center;

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

export const StyledButton = styled('button')`
  ${StyledButtonDefault}
  background-color:#ed4a44;
`;

export const StyledButtonList = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
  & > * {
    ${StyledButtonDefault}
    background-color:#7953f5;
    flex-grow: 1;
  }

  .login__submit {
    background-color: #ed4a44;
  }
`;
