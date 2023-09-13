import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .active-search {
    border: 5px dotted red;
    border-radius: 50%;
    flex-grow: unset;
    width: 50px;
    height: 50px;
    animation: move 5s infinite linear;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .non-visible {
    display: none;
  }

  @keyframes move {
    0% {
      transform: rotate(0) scale(1.5);
    }
    50% {
      transform: rotate(180deg);
      border-radius: 50%;
    }
    100% {
      transform: rotate(360deg) scale(1.5);
    }
  }
`;

function Spinner() {
  return (
    <StyledSpinner>
      <div className="active-search">
        <span className="non-visible">Loading data</span>
      </div>
    </StyledSpinner>
  );
}

export default Spinner;
