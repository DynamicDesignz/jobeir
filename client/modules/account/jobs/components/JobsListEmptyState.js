// @flow
import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const JobsListEmptyState = (props: { link: string }) => (
  <JobsListEmptyStateContainer>
    <JobsListEmptyStateContent>
      <EmptyStateHeader>Creating a job is easy</EmptyStateHeader>
      <EmptyStateText>
        When you create a job, you'll find the details and status here.
      </EmptyStateText>
      <StyledLink to={props.link}>Create a job</StyledLink>
    </JobsListEmptyStateContent>
  </JobsListEmptyStateContainer>
);

export default JobsListEmptyState;

const JobsListEmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  max-width: 1052px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin: 30px auto;

  ${media.tablet`
    margin: 20px auto;
    padding: 20px;
  `};
`;

const JobsListEmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  text-align: center;
  margin: auto 0;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: none;
  height: 50px;
  width: 100%;
  font-size: 18px;
  color: #fff;
  background: ${props => props.theme.colors.purple};
  max-width: 200px;
  cursor: pointer;
  opacity: 1;
  text-decoration: none;
  text-align: center;
`;

const EmptyStateHeader = styled.h2`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 15px;

  ${media.tablet`
    font-size: 20px;
  `};
`;

const EmptyStateText = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  color: #888888;

  ${media.tablet`
    font-size: 16px;
  `};
`;
