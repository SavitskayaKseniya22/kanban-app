import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledModal = styled('div')`
  min-width: 100px;
  min-height: 100px;
  position: absolute;
  padding: 0.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(230, 230, 230, 0.6);
  border-radius: 0.5rem;
  .modal__content {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #e5e5e5;
  }
`;

function Modal({ children }: { children: ReactElement }) {
  return (
    <StyledModal>
      <div className="modal__content">{children}</div>
    </StyledModal>
  );
}

export default Modal;
