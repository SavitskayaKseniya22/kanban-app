import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ModalContext from '../context';

const StyledModal = styled('div')`
  width: 100%;
  height: 100%;
  position: fixed;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  z-index: 99;

  .modal__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #e5e5e5;
  }
`;

function Modal({ children }: { children: string | JSX.Element | JSX.Element[] }) {
  const modalContext = React.useContext(ModalContext);
  return (
    <StyledModal
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          modalContext.setModalData(undefined);
          toast.dismiss();
        }
      }}
    >
      <div className="modal__content">{children}</div>
    </StyledModal>
  );
}

export default Modal;
