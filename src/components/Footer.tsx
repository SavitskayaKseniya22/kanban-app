import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import gitHubLogo from '../assets/images/png/GitHub_Logo_White.png';

const StyledFooter = styled('footer')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #7953f5;
  color: white;
`;

function Footer() {
  return (
    <StyledFooter>
      <Link to="https://github.com/SavitskayaKseniya22" target="blank" title="Developer's GitHub">
        <img src={gitHubLogo} alt="gitHub" width={60} height={20} />
      </Link>
      <span>&#169; 2023</span>
    </StyledFooter>
  );
}

export default Footer;
