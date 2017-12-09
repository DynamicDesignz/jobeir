// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import { serverGetCompany } from '../server/';
import { shouldGetCompany, getCompany, resetCompany } from '../ducks/';
import AppHead from '../../app/components/AppHead';
import CompanyInfo from '../components/CompanyInfo';
import CompanyInfoPlaceholder from '../components/CompanyInfoPlaceholder';
import CompanyJobList from '../components/CompanyJobList';
import CompanyJobListPlaceholder from '../components/CompanyJobListPlaceholder';
import { FadeIn } from '../../../styles/animate';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state = getState();

      if (shouldGetCompany(state)) {
        return dispatch(serverGetCompany(`/companies${req.originalUrl}`, req));
      }
    },
  },
])
class Company extends Component {
  componentDidMount() {
    const { dispatch, company, params } = this.props;

    if (!company.isLoaded) {
      dispatch(getCompany(params.companyName));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetCompany());
  }

  render() {
    const { company } = this.props;

    return (
      <div>
        <AppHead />
        <CompanyWhite>
          <CompanyColumn>
            {company.isLoaded ? (
              <FadeIn>
                <CompanyInfo company={company} />
              </FadeIn>
            ) : (
              <CompanyInfoPlaceholder />
            )}
          </CompanyColumn>
        </CompanyWhite>
        <CompanyGrey>
          <CompanyColumn>
            {company.isLoaded ? (
              <CompanyJobList jobs={company.jobs} />
            ) : (
              <CompanyJobListPlaceholder />
            )}
          </CompanyColumn>
        </CompanyGrey>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company,
});

export default connect(mapStateToProps)(Company);

const CompanyColumn = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;

const CompanyWhite = styled.div`
  border-bottom: 1px solid #eceaea;
  padding: 50px 0 40px;

  ${media.tablet`
    padding: 20px 0;
  `};
`;

const CompanyGrey = styled.div`
  background: #f9f8f7;
  padding: 40px 0 80px;

  ${media.tablet`
    padding: 20px 0;
  `};
`;
