import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import organizePic from '../assets/images/webp/organize-pic.webp';
import collabPic from '../assets/images/png/collab-pic.png';
import trackPic from '../assets/images/webp/track-pic.webp';
import planPic from '../assets/images/png/plan-pic.png';
import enjoyPic from '../assets/images/png/1billiontasks_v01.png';
import mainPic from '../assets/images/webp/main-pic.webp';

const StyledMainPage = styled('main')`
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledFirstScreen = styled('div')`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem;
  flex-grow: 6;
  background: url(${mainPic}) no-repeat center right 30% / contain scroll;

  h1 {
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: rgba(230, 230, 230, 0.6);
  }
`;

const StyledFeatureList = styled('ul')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const StyledFeatureListItem = styled('li')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  max-width: 260px;

  h3 {
    text-align: center;
    margin: 0;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: rgba(230, 230, 230, 0.6);
  }
`;

function MainPage() {
  const { t } = useTranslation();

  return (
    <StyledMainPage>
      <StyledFirstScreen>
        <h1>{t('mainpage.titles.main')}</h1>
      </StyledFirstScreen>
      <StyledFeatureList>
        <StyledFeatureListItem>
          <h3>{t('mainpage.features.organize')}</h3>
          <img src={organizePic} alt="Organize your team" width="260" height="200" />
        </StyledFeatureListItem>
        <StyledFeatureListItem>
          <img
            src={planPic}
            alt="Plan projects and assign responsibility"
            width="260"
            height="200"
          />
          <h3>{t('mainpage.features.plan')}</h3>
        </StyledFeatureListItem>
        <StyledFeatureListItem>
          <h3>{t('mainpage.features.collaborate')}</h3>
          <img src={collabPic} alt="Collaborate efficiently" width="260" height="200" />
        </StyledFeatureListItem>
        <StyledFeatureListItem>
          <img src={trackPic} alt="Track progress and deliver on time" width="260" height="200" />
          <h3>{t('mainpage.features.track')}</h3>
        </StyledFeatureListItem>
        <StyledFeatureListItem>
          <h3>{t('mainpage.features.enjoy')}</h3>
          <img src={enjoyPic} alt="Enjoy the results of your work" width="260" height="200" />
        </StyledFeatureListItem>
      </StyledFeatureList>
    </StyledMainPage>
  );
}

export default MainPage;
