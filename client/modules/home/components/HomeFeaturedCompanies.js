// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { media } from '../../../styles/breakpoints';

const featuredCompanies = [
  {
    link: '/airbnb',
    image: {
      src: '/public/static/imgs/home/companies/airbnb-logo.jpg',
      alt: 'Airbnb company profile at Jobeir',
    },
  },
  {
    link: '/slack',
    image: {
      src: '/public/static/imgs/home/companies/slack-logo.jpg',
      alt: 'Slack company profile at Jobeir',
    },
  },
  {
    link: '/stripe',
    image: {
      src: '/public/static/imgs/home/companies/stripe-logo.jpg',
      alt: 'Stripe company profile at Jobeir',
    },
  },
  {
    link: '/asana',
    image: {
      src: '/public/static/imgs/home/companies/asana-logo.jpg',
      alt: 'Lyft company profileJobeir',
    },
  },
  {
    link: '/dropbox',
    image: {
      src: '/public/static/imgs/home/companies/dropbox-logo.jpg',
      alt: 'Dropbox company profile at Jobeir',
    },
  },
  {
    link: '/shopify',
    image: {
      src: '/public/static/imgs/home/companies/shopify-logo.jpg',
      alt: 'Shopify company profile at Jobeir',
    },
  },
];

const HomeFeaturedCompanies = () => (
  <HomeFeaturedContainer>
    <FeatuedCompanyText>View jobs from </FeatuedCompanyText>
    {featuredCompanies.map(company => (
      <FeaturedCompanyLink to={company.link} key={company.link}>
        <FeaturedCompanyImage src={company.image.src} alt={company.image.alt} />
      </FeaturedCompanyLink>
    ))}
  </HomeFeaturedContainer>
);

export default HomeFeaturedCompanies;

const HomeFeaturedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 0;

  ${media.dablet`
    flex-wrap: wrap;
  `};

  ${media.tablet`
    padding: 50px 0 0;
  `};
`;

const FeatuedCompanyText = styled.p`
  color: #95989a;
  font-weight: 600;

  ${media.dablet`
    display: none
  `};
`;

const FeaturedCompanyLink = styled(Link)`
  position: relative;
  text-decoration: none;
  border-radius: 3px;
  border: 1px solid transparent;
  transition: all 200ms ease;

  ${media.dablet`
    width: 32%;
    text-align: center;
  `};

  ${media.phablet`
    width: 49%;
    text-align: center;
  `};
`;

const FeaturedCompanyImage = styled.img`
  display: block;
  margin: 0px 20px;
  max-height: 22px;
  filter: grayscale(100%) opacity(50%);
  transition: all 200ms ease;

  &:hover {
    filter: grayscale(0%) opacity(100%);
  }

  ${media.dablet`
    margin: 15px auto;
    max-height: 28px;
  `};

  ${media.phablet`
    margin: 25px auto;
    max-height: 22px;
  `};
`;
