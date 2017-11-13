import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AppHead from '../../app/components/AppHead';
import HomeSearch from '../../home/components/HomeSearch';

const WhyJobeir = () => (
  <Container>
    <AppHead title="Why Jobeir?" />
    <PageTop>
      <MainHeader>Why Jobeir?</MainHeader>
    </PageTop>
    <PageCard boxShadow>
      <SectionHeader>Our vision</SectionHeader>
      <SectionText>
        We're creating the best place to find a job in technology. Finding the
        best jobs in technology should be easy, enjoyable, and efficient. This
        community is for anyone that wants to move their career forward or grow
        their business.
        {/* At Jobeir we are building a platform to find the best jobs in technology. */}
      </SectionText>
    </PageCard>
    <PageGrey>
      <PageCard>
        <SectionHeader>We sweat the details</SectionHeader>
        <SectionText>
          There's no challenge we're afraid of at Jobeir. Our focus is always on
          creating the best no matter what the task is. All those little details
          add up to create a platform that people love using.
        </SectionText>
      </PageCard>
    </PageGrey>
    <PageCard boxShadow>
      <SectionHeader>A human touch</SectionHeader>
      <SectionText>
        Companies are collections of people working together to solve problems.
        Without people these companies would fail. That's why having a human
        touch is core to what Jobeir is striving to achieve. We're here to serve
        you.
        {/* At Jobeir we are building a platform to find the best jobs in technology. */}
      </SectionText>
    </PageCard>
    <PageCard>
      <SectionHeader>Communication & transparency</SectionHeader>
      <SectionText>
        Transparency into our process, product, and goals helps us get feedback
        from our community. Open communication will keep us on track and keep
        you in the loop for all future events, updates, and goals.
      </SectionText>
    </PageCard>
    <SearchContainer>
      <HomeSearch />
    </SearchContainer>
  </Container>
);

export default WhyJobeir;

const Container = styled.div`margin: 0 auto;`;

const PageTop = styled.div`
  padding: 80px 0;
  text-align: center;

  ${media.dablet`
    padding: 24px 0 40px;
  `};
`;

const PageGrey = styled.div`
  position: relative;
  z-index: -1;
  width: 100%;
  background: #f9f8f7;

  &::before {
    content: '';
    position: absolute;
    height: 50%;
    width: 100%;
    top: -50%;
    background: #f9f8f7;
  }
  &::after {
    content: '';
    position: absolute;
    height: 50%;
    width: 100%;
    bottom: -50%;
    background: #f9f8f7;
  }
`;

const PageCard = styled.div`
  max-width: 960px;
  ${props =>
    props.boxShadow
      ? `background: #fff;
         border: 1px solid rgba(0, 0, 0, 0.05);
         box-shadow: 0 10px 40px -1px rgba(0, 0, 0, 0.08);`
      : ''};
  margin-left: auto;
  margin-right: auto;
  padding: 120px 140px;

  ${media.dablet`
    padding: 60px 70px;
    margin: 0 24px;
  `};

  ${media.tablet`
    padding: 60px 40px;
  `};
`;

const MainHeader = styled.h1`
  font-family: ${props => props.theme.fontFamily.tiempos};
  font-size: 52px;

  ${media.dablet`
    font-size: 32px;
  `};
`;

const SectionHeader = styled.h2`
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 25px;
  font-size: 38px;
  font-weight: 200;

  ${media.dablet`
    font-size: 24px;
  `};
`;

const SectionText = styled.p`
  line-height: 2;
  font-size: 18px;
  opacity: 0.8;
`;

const SearchContainer = styled.div`
  max-width: 900px;
  margin: 0 auto 100px;
  padding: 0 24px;
`;
