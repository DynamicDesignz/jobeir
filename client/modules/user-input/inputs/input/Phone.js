// @flow
import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import InputWrapper from '../components/InputWrapper';

export const Phone = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string,
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <StyledMaskedInput
        {...props.input}
        type="tel"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
        guide={false}
        mask={[
          '(',
          /[1-9]/,
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
      />
    </InputWrapper>
  );
};

const StyledMaskedInput = styled(MaskedInput)`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  height: ${props => props.theme.input.height};
  margin: ${props => props.theme.input.margin};
  max-width: ${props => props.theme.input.maxWidth};
  appearance: none;

  ${media.tablet`
    font-size: ${props => props.theme.input.tablet.fontSize};
    height: ${props => props.theme.input.tablet.height};
    padding: ${props => props.theme.input.tablet.padding};
  `};

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.input.activeBorderColor};
  }

  ::-webkit-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};

    ${media.tablet`
      font-size: ${props => props.theme.input.tablet.fontSize};
    `};
  }
  :-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
    ${media.tablet`
      font-size: ${props => props.theme.input.tablet.fontSize};
    `};
  }
  ::-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
    ${media.tablet`
      font-size: ${props => props.theme.input.tablet.fontSize};
    `};
  }
  :-ms-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    ${media.tablet`
      font-size: ${props => props.theme.input.tablet.fontSize};
    `};
  }
`;
