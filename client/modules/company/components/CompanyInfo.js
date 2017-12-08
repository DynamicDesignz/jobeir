import React from 'react';
import styled from 'styled-components';

const CompanyJobInfo = ({ company }) => (
  <CompanyContainer>
    <div>
      <CompanyLogo src={company.logo} />
      <CompanyProduct>{company.product}</CompanyProduct>
    </div>
    <div>
      <div>{company.displayName}</div>
      <div>
        <Link />
        {company.website}
      </div>
      <div>
        <People />
        {company.size}
      </div>
      <div>
        <Point />
        {company.locations[0].address.locality}
      </div>
    </div>
  </CompanyContainer>
);

export default CompanyJobInfo;

const Link = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
        data-cap="butt"
        data-color="color-2"
      />{' '}
      <path
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
        data-cap="butt"
      />{' '}
    </g>
  </svg>
);
const People = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <circle
        cx="5.5"
        cy="4.5"
        r="3"
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-cap="butt"
      />{' '}
      <circle
        cx="12.5"
        cy="4.5"
        r="2"
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-cap="butt"
        data-color="color-2"
      />{' '}
      <path
        d="M5.5,9.5h0a5,5,0,0,0-5,5h10A5,5,0,0,0,5.5,9.5Z"
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-cap="butt"
      />{' '}
      <path
        d="M10.841,9A2.986,2.986,0,0,1,12.5,8.5h0a3,3,0,0,1,3,3v1h-3"
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-cap="butt"
        data-color="color-2"
      />
    </g>
  </svg>
);
const Point = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        d="M13.5,6c0,4.5-5.5,9.5-5.5,9.5S2.5,10.5,2.5,6a5.5,5.5,0,0,1,11,0Z"
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />{' '}
      <circle
        cx="8"
        cy="6"
        r="2.5"
        fill="none"
        stroke="#0f0f17"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-color="color-2"
      />
    </g>
  </svg>
);
const CompanyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CompanyLogo = styled.img`
  max-height: 48px;
  margin-bottom: 20px;
`;

const CompanyProduct = styled.p`max-width: 400px;`;
