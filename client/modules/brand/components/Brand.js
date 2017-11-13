import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AppHead from '../../app/components/AppHead';

const Brand = () => (
  <BrandContainer>
    <AppHead title="Brand" />
    <BrandTop>
      <BrandTopHeader>
        <BrandTopHeaderLine />Brand
      </BrandTopHeader>
      <BrandTopText>
        Please do not modify the Jobeir marks or use them in inappropriate
        matters. Use your best judgement when placing the marks, but we
        recommend using the standard color mark with appropriate padding. We
        forbid the use of our marks suggesting sponsorship or endorsement by
        Jobeir with no consent.
      </BrandTopText>
    </BrandTop>
    <Flex>
      <BrandImageContainer>
        <BrandSmallHeader>White background</BrandSmallHeader>
        <ImageContainer>
          <img
            src="/public/static/brand/logo/color/jobeir-logo.svg"
            alt="Jobeir logo"
          />
        </ImageContainer>
      </BrandImageContainer>

      <BrandImageContainer>
        <BrandSmallHeader>Dark background</BrandSmallHeader>
        <ImageContainer purple>
          <img
            src="/public/static/brand/logo/white/jobeir-logo-white.svg"
            alt="Jobeir logo white"
          />
        </ImageContainer>
      </BrandImageContainer>
    </Flex>
    <DownloadButton href="/public/static/brand/jobeir-brand.zip">
      Download logo files
    </DownloadButton>
  </BrandContainer>
);

export default Brand;

const BrandContainer = styled.div`
  max-width: 960px;
  padding: 40px 0 100px;
  margin: 0 auto;

  ${media.dablet`
    padding: 0 24px;
  `};
`;

const BrandTop = styled.div`
  max-width: 960px;
  padding: 80px 0;
  margin: 0 auto;

  ${media.dablet`
    padding: 24px 0;
  `};
`;

const BrandTopHeader = styled.h2`
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.fontFamily.tiempos};
  font-size: 52px;
  margin-bottom: 30px;

  ${media.dablet`
    font-size: 32px;
  `};
`;

const BrandTopHeaderLine = styled.span`
  display: inline-block;
  height: 3px;
  width: 60px;
  margin-right 20px;
  background: ${props => props.theme.colors.black};

  ${media.dablet`
    width:40px;
  `};
`;

const BrandTopText = styled.p`
  max-width: 480px;
  opacity: 0.8;
  line-height: 1.6;
  font-size: 18px;

  ${media.dablet`
    margin-bottom: 30px;
  `};
`;

const BrandSmallHeader = styled.h4`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Flex = styled.div`
  display: flex;

  ${media.dablet`
    flex-direction: column;
  `};
`;

const ImageContainer = styled.div`
  width: 400px;
  padding: 40px 80px;
  border: 1px solid #e3e9ef;
  border-radius: 4px;
  background: ${props => (props.purple ? '#595c71' : '#fff')};
  margin-right: 40px;

  ${media.dablet`
    width: 100%;
    padding: 20px 40px;
    margin: 0 auto;
  `};
`;

const BrandImageContainer = styled.div`margin-bottom: 50px;`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 188px;
  height: 50px;
  padding: 0 20px;
  margin: 50px 0;
  font-size: 16px;
  color: white;
  background-color: ${props => props.theme.colors.purple};
  border-radius: 4px;
  text-decoration: none;
`;
