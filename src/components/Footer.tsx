import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gitHubLogo from '../assets/images/png/GitHub_Logo_White.png';

const StyledFooter = styled('footer')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #7953f5;
  color: white;
  gap: 1rem;

  a {
    display: flex;
    width: 60px;
    height: 20px;

    img {
      width: 100%;
    }
  }
`;

function Footer() {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <Link
        to="https://github.com/SavitskayaKseniya22"
        target="_blank"
        title={t('footer.githubLink')}
      >
        <img src={gitHubLogo} alt="gitHub" />
      </Link>
      <span>&#169; 2023</span>
    </StyledFooter>
  );
}

export default Footer;
