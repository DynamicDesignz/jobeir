import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import { Glow } from '../../../styles/animate/';

const CompanyInfoPlaceholder = () => (
  <Glow>
    <CompanyContainer>
      <CompanyLogo />
      <CompanyProductTextContainer>
        <CompanyProductText width={88} />
        <CompanyProductText width={100} />
      </CompanyProductTextContainer>
      <CompanyDetails />
      <CompanyJobSearch />
    </CompanyContainer>
  </Glow>
);

export default CompanyInfoPlaceholder;

const CompanyContainer = styled.div`text-align: center;`;

const CompanyLogo = styled.div`
  background: ${props => props.theme.colors.placeholder};
  height: 60px;
  width: 276px;
  margin: 0 auto 39px;
`;

const CompanyProductTextContainer = styled.div`
  width: 66%;
  margin: 0 auto 20px;

  ${media.tablet`
    width: 94%
  `};
`;

const CompanyProductText = styled.div`
  background: ${props => props.theme.colors.placeholder};
  height: 20px;
  width: ${props => props.width}%;
  margin: 0 auto 12px;
`;

const CompanyDetails = styled.div`
  background: ${props => props.theme.colors.placeholder};
  height: 20px;
  width: 400px;
  margin: 0 auto 20px;
`;

const CompanyJobSearch = styled.div`
  background: ${props => props.theme.colors.placeholder};
  height: 40px;
  border-radius: 30px;
  width: 400px;
  margin: 0 auto;

  ${media.tablet`
    width: 100%
  `};
`;
