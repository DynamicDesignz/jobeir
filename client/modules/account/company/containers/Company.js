import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import ShellFormSection from '../../shell/components/ShellFormSection';
import UpdateCompanyFormAbout from '../../../user-input/forms/form/update-company/UpdateCompanyFormAbout';
import UpdateCompanyFormContact from '../../../user-input/forms/form/update-company/UpdateCompanyFormContact';
import UpdateCompanyFormSize from '../../../user-input/forms/form/update-company/UpdateCompanyFormSize';
import UpdateCompanyFormLocation from '../../../user-input/forms/form/update-company/UpdateCompanyFormLocation';
import UpdateCompanyUpload from '../../../user-input/forms/form/update-company/UpdateCompanyUpload';
import { FadeIn } from '../../../../styles/animate/';

const Company = ({ activeCompany = false }) => (
  <CompanyContainer>
    <FadeIn>
      {activeCompany ? (
        [
          <ShellFormSection text="Tell us about your company">
            <UpdateCompanyFormAbout />
          </ShellFormSection>,
          <ShellFormSection text="Company logo">
            <UpdateCompanyUpload />
          </ShellFormSection>,
          <ShellFormSection text="How can people will contact you?">
            <UpdateCompanyFormContact />
          </ShellFormSection>,
          <ShellFormSection text="Company size">
            <UpdateCompanyFormSize />
          </ShellFormSection>,

          <ShellFormSection text="Where's your office located?">
            <UpdateCompanyFormLocation />
          </ShellFormSection>,
        ]
      ) : (
        <div>Once you create a company the details will be here</div>
      )}
    </FadeIn>
  </CompanyContainer>
);

const mapStateToProps = state => ({
  activeCompany:
    state.account.companies.activeCompany &&
    state.account.companies.activeCompany._id,
});

export default connect(mapStateToProps)(Company);

const CompanyContainer = styled.div`
  max-width: 1052px;
  width: 100%;
  margin: 0 auto 150px;

  ${media.tablet`
    margin-bottom: 80px
  `};

  ${media.phonePlus`
    margin-bottom: 40px
  `};
`;
