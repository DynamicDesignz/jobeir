// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { serverGetCompany } from '../server/';
import { shouldGetCompany, getCompany, resetCompany } from '../ducks/';
import AppHead from '../../app/components/AppHead';
import CompanyInfo from '../components/CompanyInfo';
import CompanyJobList from '../components/CompanyJobList';

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
        <CompanyWhite>
          <CompanyColumn>
            <CompanyInfo company={company} />
          </CompanyColumn>
        </CompanyWhite>
        <CompanyGrey>
          <CompanyColumn>
            <CompanyJobList jobs={company.jobs} />
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
`;

const CompanyGrey = styled.div`
  background: #f9f8f7;
  padding: 40px 0 80px;
`;
