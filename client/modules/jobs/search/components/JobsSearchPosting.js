// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import moment from 'moment';

const JobsSearchPosting = (props: {
  posting: {
    title: string,
    company: {
      displayName: string,
      product: string,
      logo: string
    },
    location: {
      address: {
        locality: string,
        short_administrative_area_level_1: string,
        country: string
      }
    },
    _id: string,
    employmentType: string,
    salaryMax: {
      min: number,
      max: number
    },
    salaryMin: number,
    createdAt: string
  }
}) => {
  const { posting } = props;

  return (
    <JobsSearchPostingContainer>
      <JobsSearchPostingTop>
        <div>
          <JobsSearchPostingTitle>
            {posting.title}
          </JobsSearchPostingTitle>
          <JobsSearchPostingSubTitle>
            <span>
              {posting.company.displayName}
              {' in '}
            </span>
            <span>
              {posting.location.address.locality},{' '}
              {posting.location.address.short_administrative_area_level_1},{' '}
              {posting.location.address.country}
            </span>
          </JobsSearchPostingSubTitle>
        </div>
        <JobsSearchPostingLogo src={posting.company.logo} alt="" />
      </JobsSearchPostingTop>
      <JobsSearchPostingCompanyProduct>
        {posting.company.product}
      </JobsSearchPostingCompanyProduct>
      <JobsSearchPostingBottom>
        <JobsSearchPostingType>
          {posting.employmentType}, ${posting.salary.max / 1000}K {' - '}${posting.salary.min / 1000}K
        </JobsSearchPostingType>
        <JobsSearchPostingDate>
          {moment(posting.createdAt).fromNow()}
        </JobsSearchPostingDate>
      </JobsSearchPostingBottom>
      <StyledLink to={`/jobs/${posting._id}`} />
    </JobsSearchPostingContainer>
  );
};

export default JobsSearchPosting;

const JobsSearchPostingContainer = styled.div`
  position: relative;
  width: 680px;
  margin: 0 auto;
  padding: 25px 30px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .18);
  margin-bottom: 20px;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const JobsSearchPostingTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const JobsSearchPostingBottom = styled.div`
  display: flex;
  flex-direction: column;
  color: #8f8f8f;
`;

const JobsSearchPostingTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 2px;
`;

const JobsSearchPostingSubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  opacity: 0.7;
`;

const JobsSearchPostingLogo = styled.img`
  height: 35px;
  border-radius: 100%;
  vertical-align: middle;
  border-radius: 4px;
  overflow: hidden;
  align-self: flex-start;
`;

const JobsSearchPostingType = styled.div`display: flex;`;

const JobsSearchPostingDate = styled.div``;

const JobsSearchPostingCompanyProduct = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
  color: #6a6666;
`;
