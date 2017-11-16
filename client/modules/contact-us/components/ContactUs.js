import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AppHead from '../../app/components/AppHead';

const ContactUs = () => (
  <ContactUsContainer>
    <AppHead title="Contact us" />
    <div>
      <ContactUsTop>
        <ContactUsTopHeader>
          <ContactUsTopHeaderLine />Contact us
        </ContactUsTopHeader>
        <ContactUsTopText>
          Have questions? Just want to talk? Please contact us directly through
          email and we'll get back to you as soon as possible.
        </ContactUsTopText>
      </ContactUsTop>
      <ContactUsContentContainer>
        <ContactUsContentName>
          <ContactUsPerson>
            <ContactUsPersonName>Katie Bozek</ContactUsPersonName>
            <ContactUsPersonTitle>Operations</ContactUsPersonTitle>
            <ContactUsPersonEmail href="mailto:katie@jobeir.com">
              katie@jobeir.com
            </ContactUsPersonEmail>
          </ContactUsPerson>
          <ContactUsPerson>
            <ContactUsPersonName>Dennis Brotzky</ContactUsPersonName>
            <ContactUsPersonTitle>Founder</ContactUsPersonTitle>
            <ContactUsPersonEmail href="mailto:dennis@jobeir.com">
              dennis@jobeir.com
            </ContactUsPersonEmail>
          </ContactUsPerson>
        </ContactUsContentName>
        <ContactUsAddress>
          <ContactUsPersonTitle>705 - 518 Beatty St</ContactUsPersonTitle>
          <ContactUsPersonTitle>Vancouver, BC, Canada</ContactUsPersonTitle>
          <ContactUsPersonTitle>V6G 6G8</ContactUsPersonTitle>
        </ContactUsAddress>
      </ContactUsContentContainer>
    </div>
  </ContactUsContainer>
);

export default ContactUs;

const ContactUsContainer = styled.div`
  max-width: 960px;
  padding: 40px 0 120px;
  margin: 0 auto;

  ${media.dablet`
    padding: 0 24px 80px;
  `};
`;

const ContactUsTop = styled.div`
  max-width: 960px;
  padding: 80px 0;
  margin: 0 auto;

  ${media.dablet`
    padding: 24px 0;
  `};
`;

const ContactUsTopHeader = styled.h2`
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.fontFamily.tiempos};
  font-size: 52px;
  margin-bottom: 30px;

  ${media.dablet`
    font-size: 32px;
  `};
`;

const ContactUsTopHeaderLine = styled.span`
  display: inline-block;
  height: 3px;
  width: 60px;
  margin-right 20px;
  background: ${props => props.theme.colors.black};

  ${media.dablet`
    width:40px;
  `};
`;

const ContactUsTopText = styled.p`
  max-width: 480px;
  opacity: 0.8;
  line-height: 1.6;
  font-size: 18px;

  ${media.dablet`
    margin-bottom: 30px;
  `};
`;

const ContactUsPerson = styled.div`
  font-size: 20px;
  margin-right: 80px;
  padding-left: 20px;
  border-left: 2px solid #e3e3e3;
  padding: 6px 0 6px 24px;

  ${media.tablet`
    display: block;
    margin: 0 0 40px 0;
  `};
`;
const ContactUsAddress = styled.div`
  font-size: 20px;
  padding: 6px 0 6px 0;
`;

const ContactUsPersonName = styled.h4`
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 10px;
`;

const ContactUsPersonTitle = styled.div`margin-bottom: 8px;`;

const ContactUsPersonEmail = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;

const ContactUsContentName = styled.div`
  display: flex;

  ${media.tablet`
    display: block;
    margin-bottom: 20px;
  `};
`;

const ContactUsContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  `};
`;
