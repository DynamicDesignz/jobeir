// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Link } from 'react-router';
import moment from 'moment';
import { FadeIn } from '../../../../styles/animate/';
import { ChevronLeft } from '../../../../icons';

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
  const includesSalary: boolean =
    posting.salary.min > 0 && posting.salary.max > 0;
  const jobId: string = posting.pathname || posting._id;

  return (
    <FadeIn>
      <JobsSearchPostingContainer>
        <StyledLink to={`/jobs/${jobId}`}>
          <JobsSearchPostingTop>
            <JobsSearchPostingText>
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
            </JobsSearchPostingText>
            <CompanyLogo src={posting.company.logo} />
          </JobsSearchPostingTop>
          <JobsSearchPostingCompanyProduct>
            {trunc(posting.company.product, 170)}
          </JobsSearchPostingCompanyProduct>
          <JobsSearchPostingBottom includesSalary={true}>
            <JobsSearchPostingType includesSalary={includesSalary}>
              {posting.employmentType} {' '}
              {includesSalary && (
                <span>
                  · ${posting.salary.min / 1000}K - ${posting.salary.max / 1000}K
                </span>
              )}
              <span>
                {includesSalary ? '' : ' · posted '}
                {moment(posting.published).fromNow()}
              </span>
            </JobsSearchPostingType>
            <StyledJobsLink to={`/${posting.company.name}`}>
              View all {posting.company.displayName} jobs <RightArrow />
            </StyledJobsLink>
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
  margin-bottom: 20px;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  cursor: pointer;

  ${media.phablet`
    margin-bottom: 12px;
  `};
`;

const StyledLink = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  padding: 26px 34px 30px;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.colors.black};

  ${media.phablet`
    padding: 20px;
  `};
`;

const StyledJobsLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.colors.black};

  &:hover svg {
    transform: translateX(3px);
  }

  svg {
    transition: transform 180ms ease-in-out;
    margin: 0 0 2px 8px;
  }

  ${media.phablet`
    margin-top: 12px;
    
      svg {
        display: none;
      }
  `};
`;

const RightArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="18px"
    height="18px"
    viewBox="0 0 32 32"
    strokeWidth="2"
  >
    <g strokeWidth="2" transform="translate(0, 0)">
      <line
        data-cap="butt"
        data-color="color-2"
        fill="none"
        stroke="#0f0f17"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="2"
        y1="16"
        x2="30"
        y2="16"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polyline
        fill="none"
        stroke="#0f0f17"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points="21,7 30,16 21,25 "
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

const CompanyLogo = styled.img`
  max-width: 88px;
  max-height: 28px;

  ${media.phablet`
    order: 1;
    margin-bottom: 10px;
  `};
`;

const Purple = styled.span`color: ${props => props.theme.colors.purple};`;

const JobsSearchPostingTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;

  ${media.phablet`
    margin-bottom: 10px;
    flex-direction: column;
  `};
`;

const JobsSearchPostingText = styled.div`
  ${media.phablet`
    order: 2;
  `};
`;

const JobsSearchPostingBottom = styled.div`
  display: flex;
  justify-content: ${props =>
    props.includesSalary ? 'space-between' : 'flex-start'};
  color: ${props => props.theme.colors.black};

  ${media.phablet`
    flex-direction: column;
    font-size: 14px;
  `};
`;

const JobsSearchPostingTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 14px;
  font-family: ${props => props.theme.fontFamily.tiempos};

  ${media.tablet`
    font-size: 25px;
    margin-bottom: 12px;
  `};

  ${media.phonePlus`
    font-size: 22px;
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
  margin-bottom: 16px;
  color: #5f5e5e;

  ${media.phablet`
    display: none;
    font-size: 14px;
    margin-bottom: 10px;
  `};
`;
