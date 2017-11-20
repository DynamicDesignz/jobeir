// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import FormWrapper from '../../containers/FormWrapper';
import { Upload } from '../../../inputs/input';
import { uploadCompanyLogo } from '../../../../account/create/company/ducks/';

class UpdateCompanyLogo extends Component {
  state = {
    showCompanyLogo: true,
    showSuccess: false,
  };

  formSubmit = (): void => {
    browserHistory.push(`/account/jobs`);
  };

  handleOnDrop = (files: Array<{}>): void => {
    const { dispatch, activeCompany } = this.props;
    const file: {} = files[0];
    const formData = new FormData();
    formData.append('logo', file);

    dispatch(uploadCompanyLogo(formData, activeCompany._id));
    this.setState({ showSuccess: true });
  };

  handleExit = (): void => {
    browserHistory.push('/account/jobs');
  };

  render() {
    const { activeCompany, companies, handleSubmit } = this.props;
    const { showCompanyLogo, showSuccess } = this.state;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="account"
      >
        {showCompanyLogo ? (
          <CompanyImage src={activeCompany.logo} />
        ) : (
          <Field
            name="logo"
            label="Company logo"
            handleOnDrop={this.handleOnDrop}
            isUploading={companies.isUploading}
            component={Upload}
            buttonText="Upload Logo"
          />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <CompanyImageButton
            onClick={() =>
              this.setState({
                showCompanyLogo: !showCompanyLogo,
                showSuccess: false,
              })}
            type="button"
          >
            {showCompanyLogo ? 'Update company logo' : 'Cancel'}
          </CompanyImageButton>
          <CompanyImageFeedback>
            {companies.successfulUpload &&
              !showCompanyLogo &&
              showSuccess &&
              'Upload successful'}
          </CompanyImageFeedback>
        </div>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  activeCompany: state.account.companies.created.find(
    comp => comp._id === state.account.companies.activeCompany._id,
  ),
});

UpdateCompanyLogo = reduxForm({
  form: 'company-upload',
  destroyOnUnmount: false,
})(UpdateCompanyLogo);

export default connect(mapStateToProps)(UpdateCompanyLogo);

const CompanyImage = styled.img`
  display: block;
  max-width: 250px;
  max-height: 65px;
`;

const CompanyImageButton = styled.button`
  appearance: none;
  background: transparent;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const CompanyImageFeedback = styled.div`
  color: ${props => props.theme.colors.green};
`;
