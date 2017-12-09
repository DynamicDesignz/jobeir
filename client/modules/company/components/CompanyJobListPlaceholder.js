import React from 'react';
import styled from 'styled-components';
import { Glow } from '../../../styles/animate/';

const CompanyJobListPlaceholder = () => (
  <Glow>
    <CompanyJob />
    <CompanyJob />
    <CompanyJob />
  </Glow>
);

export default CompanyJobListPlaceholder;

const CompanyJob = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  margin-bottom: 10px;
  width: 100%;
  height: 90px;
`;

const CompanyProductTextContainer = styled.div`
  width: 62%;
  margin: 0 auto 20px;
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
  margin: 0 auto;
`;
