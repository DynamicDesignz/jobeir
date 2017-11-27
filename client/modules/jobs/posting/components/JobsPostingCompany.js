// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { FadeIn } from '../../../../styles/animate';

const JobsPostingCompany = (props: { activePosting: {} }) => {
  const { activePosting } = props;
  const activePostingReady: boolean =
    Object.keys(activePosting.company).length > 0;

  return (
    <JobsPostingCompanyContainer>
      {activePostingReady && (
        <FadeIn>
          <JobsPostingCompanyHeader>
            About {activePosting.company.displayName}
          </JobsPostingCompanyHeader>
          <JobsPostingCompanyText>
            {activePosting.company.product}
          </JobsPostingCompanyText>

          <JobsPostingCompanyLink
            href={`${activePosting.externalLink}?ref=jobeir`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply to {activePosting.company.displayName}
          </JobsPostingCompanyLink>
        </FadeIn>
      )}
    </JobsPostingCompanyContainer>
  );
};

export default JobsPostingCompany;

const JobsPostingCompanyContainer = styled.div`
  max-width: 744px;
  padding: 0 24px;
  margin: 50px auto 20px;

  ${media.tablet`
    margin: 30px auto;
  `};
`;
const JobsPostingCompanyHeader = styled.h3`
  font-size: 38px;
  font-weight: 900;
  margin-bottom: 20px;

  ${media.tablet`
    margin-bottom: 15px;
    font-size: 30px;
  `};

  ${media.phablet`
    margin-bottom: 0px;
  `};
`;

const JobsPostingCompanyText = styled.p`
  line-height: 32px;
  margin-bottom: 40px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
  font-family: ${props => props.theme.fontFamily.tiempos};
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  ${media.desktop`
    font-size: 18px;
  `};

  ${media.phablet`
    font-size: 16px;
  `};

  ${media.phonePlus`
    margin-bottom: 15px;
  `};
`;

const JobsPostingCompanyLink = styled.a`
  position: relative;
  margin: 70px auto 140px;
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: ${props => props.theme.colors.purple};
  border: 2px solid ${props => props.theme.colors.purple};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 200ms ease;

  &:hover {
    background: ${props => props.theme.colors.purple};
    color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.22);
  }

  ${media.tablet`
    font-size: 16px;
    height: 48px
    margin: 40px auto 80px;
  `};
`;
