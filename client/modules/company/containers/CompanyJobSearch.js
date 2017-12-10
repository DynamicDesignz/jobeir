import React from 'react';
import styled from 'styled-components';

const CompanyJobSearch = ({ handleInputChange, value, placeholder }) => (
  <InputContainer>
    <StyledInput
      type="text"
      onChange={handleInputChange}
      value={value}
      placeholder={placeholder}
    />
  </InputContainer>
);

export default CompanyJobSearch;

const StyledInput = styled.input`
  border: solid 1px #babbbb;
  padding: 11px 19px 8px;
  border-radius: 30px;
  margin: 20px auto 0;
  width: 400px;
  color: ${props => props.theme.colors.block};
  font-size: 16px;

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #b1b1b1;
    font-weight: 200;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #b1b1b1;
    font-weight: 200;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: #b1b1b1;
    font-weight: 200;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: #b1b1b1;
    font-weight: 200;
  }
`;

const InputContainer = styled.div`
  text-align: center;
  margin: 10px auto 0;
`;
