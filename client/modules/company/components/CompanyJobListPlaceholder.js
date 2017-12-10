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
