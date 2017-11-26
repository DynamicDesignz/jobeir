// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Link } from 'react-router';
import moment from 'moment';
import { FadeIn } from '../../../../styles/animate/';

const trunc = (str: string, length: number): string =>
  str.length > length ? `${str.substr(0, length - 1)}...` : str;

const JobsSearchPosting = (props: {
  posting: {
    title: string,
    company: {
      displayName: string,
      product: string,
      logo: string,
    },
    location: {
      address: {
        locality: string,
        short_administrative_area_level_1: string,
        country: string,
      },
    },
    _id: string,
    employmentType: string,
    salaryMax: {
      min: number,
      max: number,
    },
    salaryMin: number,
    published: string,
  },
}) => {
  const { posting } = props;
  const includesSalary = posting.salary.min > 0 && posting.salary.max > 0;

  return (
    <FadeIn>
      <JobsSearchPostingContainer>
        <StyledLink to={`/jobs/${posting._id}`}>
          <JobsSearchPostingTop>
            <div>
              <JobsSearchPostingTitle>{posting.title}</JobsSearchPostingTitle>
              <JobsSearchPostingSubTitle>
                <span>
                  <Purple>{posting.company.displayName}</Purple>
                  {' in '}
                </span>
                <span>
                  {posting.location.address.locality},{' '}
                  {posting.location.address.short_administrative_area_level_1},{' '}
                  {posting.location.address.country}
                </span>
              </JobsSearchPostingSubTitle>
            </div>
          </JobsSearchPostingTop>
          <JobsSearchPostingCompanyProduct>
            {trunc(posting.company.product, 175)}
          </JobsSearchPostingCompanyProduct>
          <JobsSearchPostingBottom includesSalary={includesSalary}>
            <JobsSearchPostingType includesSalary={includesSalary}>
              {posting.employmentType}
              {includesSalary && (
                <span>
                  {' '}
                  · ${posting.salary.min / 1000}K - ${posting.salary.max / 1000}K
                </span>
              )}
            </JobsSearchPostingType>
            <span>
              {includesSalary ? '' : ' · posted '}
              {moment(posting.published).fromNow()}
            </span>
          </JobsSearchPostingBottom>
        </StyledLink>
      </JobsSearchPostingContainer>
    </FadeIn>
  );
};

export default JobsSearchPosting;

const JobsSearchPostingContainer = styled.div`
  position: relative;
  margin: 0 auto;
  background: #fff;
  margin-bottom: 46px;

  ${media.phablet`
    margin-bottom: 34px;
  `};
`;

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;

const Purple = styled.span`color: ${props => props.theme.colors.purple};`;

const JobsSearchPostingTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  ${media.phablet`
    margin-bottom: 6px;
  `};

  ${media.phonePlus`
    margin-bottom: 2px;
  `};
`;

const JobsSearchPostingBottom = styled.div`
  display: flex;
  justify-content: ${props =>
    props.includesSalary ? 'space-between' : 'flex-start'};
  color: #545454;

  ${media.phablet`
    font-size: 14px;
  `};
`;

const JobsSearchPostingTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 10px;
  font-family: ${props => props.theme.fontFamily.tiempos};

  ${media.tablet`
    font-size: 25px;
    margin-bottom: 4px;
  `};
`;

const JobsSearchPostingSubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;

  ${media.tablet`
    margin-bottom: 2px;
  `};
`;

const JobsSearchPostingType = styled.div`
  display: flex;
  ${props => (props.includesSalary ? `` : `margin-right: 4px;`)};
`;

const JobsSearchPostingCompanyProduct = styled.p`
  line-height: 1.6;
  margin-bottom: 10px;
  color: #5f5e5e;

  ${media.phablet`
    font-size: 14px;
    margin-bottom: 8px;
  `};
`;
