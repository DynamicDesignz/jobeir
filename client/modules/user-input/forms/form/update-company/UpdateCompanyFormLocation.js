// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { SubmitButton, Text } from '../../../inputs/input';
import { updateCompany } from '../../../../account/create/company/ducks';
import UpdateCompanyFormLocationEdit from './UpdateCompanyFormLocationEdit';
import Autocomplete from '../../../autocomplete/Autocomplete';

class CompanyFormStepThree extends Component {
  formSubmit = (data: {}): void => {
    this.props.dispatch(
      updateCompany(data, this.props.companies.activeCompany._id),
    );
  };

  render() {
    const { companies, handleSubmit, locations } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="account"
      >
        <AutocompleteContainer>
          <Field
            name="fullAddress"
            label="Start typing full address"
            placeholder="123 Main Street"
            component={Text}
            autocomplete={false}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          <Autocomplete formName="company-edit" id="fullAddress" />
        </AutocompleteContainer>
        {locations.length > 0 && (
          <MultipleLocations>
            Have more than one office? Just type in another address to add it.
          </MultipleLocations>
        )}
        <FieldArray
          name="locations"
          locations={locations}
          component={UpdateCompanyFormLocationEdit}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '50px',
          }}
        >
          <Field
            name="submitButton"
            buttonText="Save"
            component={SubmitButton}
            isSubmitting={companies.isUpdating}
          />
        </div>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('company-edit');

const mapStateToProps = state => ({
  companies: state.account.companies,
  locations: selector(state, 'locations') || [],
});

CompanyFormStepThree = reduxForm({
  form: 'company-edit',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(CompanyFormStepThree);

export default connect(mapStateToProps)(CompanyFormStepThree);

const MultipleLocations = styled.h3`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 25px;
`;

const AutocompleteContainer = styled.div`position: relative;`;
