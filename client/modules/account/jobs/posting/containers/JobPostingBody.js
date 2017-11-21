// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import draftToHtml from 'draftjs-to-html';

const JobPostingBody = ({ activePosting }) => (
  <JobPostingBodyContainer>
    <div
      dangerouslySetInnerHTML={{
        __html: draftToHtml(
          JSON.parse(activePosting.descriptionRaw || JSON.stringify({})),
        ),
      }}
    />
  </JobPostingBodyContainer>
);

export default JobPostingBody;

const JobPostingBodyContainer = styled.div`
  position: relative;
  max-width: 744px;
  margin: 0 auto;
  padding: 0 24px;

  strong {
    font-weight: 900;
  }

  p {
    line-height: 32px;
    margin-bottom: 40px;
    font-size: 19px;
    color: rgba(0, 0, 0, 0.75);
    font-family: ${props => props.theme.fontFamily.tiempos};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    ${media.phablet`
      font-size: 18px;
      line-height: 28px;
    `};

    ${media.phonePlus`
      margin-bottom: 30px;
    `};
  }

  a {
    color: ${props => props.theme.colors.purple};
    text-decoration-skip: ink;
    font-family: ${props => props.theme.fontFamily.tiempos};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    &:hover,
    &:visited {
      color: ${props => props.theme.colors.purple};
    }
  }

  img {
    width: 100%;
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: 800;
    margin-bottom: 20px;

    ${media.tablet`
      margin-bottom: 15px;
    `};

    ${media.phablet`
      margin-bottom: 8px;
    `};
  }

  h2 {
    font-weight: 800;
    font-size: 28px;
    margin-bottom: 25px;

    ${media.phablet`
      font-size: 20px;
      margin-bottom: 15px;
    `};

    ${media.phonePlus`
      margin-bottom: 8px;
    `};
  }

  h3 {
    font-weight: 800;
    font-size: 24px;

    ${media.phablet`
      font-size: 18px;
    `};
  }

  h4,
  h6 {
    font-size: 20px;

    ${media.phablet`
      font-size: 18px;
    `};
  }

  ul,
  ol {
    line-height: 32px;
    padding-left: 20px;
    margin-bottom: 50px;
    font-size: 20px;
    color: #2b2b2b;
    font-family: ${props => props.theme.fontFamily.tiempos};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    ${media.tablet`
      margin-bottom: 20px;
      font-size: 18px;
      line-height: 28px;
    `};

    & > li {
      margin-bottom: 12px;
      font-size: 19px;
      color: #2b2b2b;

      ${media.tablet`
        margin-bottom: 12px;
        font-size: 18px;
      `};
    }
  }
`;
