// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import moment from 'moment';
import JobPostingHeaderPlaceholder from './JobPostingHeaderPlaceholder';
import { FadeIn } from '../../../../../styles/animate/';

const JobPostingHeader = (props: { activePosting: {}, hideLogo: boolean }) => {
  const { activePosting, hideLogo } = props;
  const activePostingReady: boolean =
    Object.keys(activePosting.company).length > 0;

  return (
    <div>
      <JobPostingHeaderContainer>
        {activePostingReady ? (
          <FadeIn>
            <JobPostingHeaderCompany>
              {!hideLogo && (
                <JobPostingHeaderCompanyLogo
                  src={activePosting.company.logo}
                  alt={activePosting.company.displayName}
                />
              )}
            </JobPostingHeaderCompany>
            <JobPostingHeaderTitle>{activePosting.title}</JobPostingHeaderTitle>
            <JobPostingHeaderLocation>
              Located in {activePosting.location.address.locality},{' '}
              {activePosting.location.address.country}
            </JobPostingHeaderLocation>
            <JobPostingHeaderDate>
              {moment(activePosting.createdAt).format('MMMM Do, YYYY')}
            </JobPostingHeaderDate>
          </FadeIn>
        ) : (
          <JobPostingHeaderPlaceholder />
        )}
      </JobPostingHeaderContainer>
    </div>
  );
};

export default JobPostingHeader;

const JobPostingHeaderContainer = styled.div`
  max-width: 670px;
  margin: 0 auto 60px;
  padding: 0 24px;

  ${media.tablet`
    margin-bottom: 40px;
  `};
`;

const JobPostingHeaderCompanyLogo = styled.img`
  height: 50px;

  ${media.phablet`
    height: 40px;
  `};
`;

const JobPostingHeaderCompany = styled.div`
  margin-bottom: 40px;

  ${media.phablet`
    margin-bottom: 25px;
  `};
`;

const JobPostingHeaderTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 15px;

  ${media.tablet`
    font-size: 44px;
  `};

  ${media.phablet`
    font-size: 36px;
    margin-bottom: 10px;
  `};
`;

const JobPostingHeaderLocation = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;

  ${media.tablet`
    font-size: 16px;
    margin-bottom: 5px;
  `};
`;

const JobPostingHeaderDate = styled.p`
  font-size: 18px;
  font-weight: 400;

  ${media.tablet`
    font-size: 16px;
  `};
`;
