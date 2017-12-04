// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
// import { serverGetJob } from '../server/';
// import { shouldGetJob, getJobPosting, resetJobPosting } from '../ducks/';
import AppHead from '../../app/components/AppHead';

// @asyncConnect([
//   {
//     promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
//     //   const state = getState();

//     //   if (shouldGetJob(state)) {
//     //     return dispatch(serverGetJob(req.originalUrl, req));
//     //   }
//     // },
//   },
// ])
class Company extends Component {
  componentDidMount() {}

  render() {
    const { params } = this.props;

    return (
      <CompanyContainer>
        <div>Company</div>
      </CompanyContainer>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Company);

const CompanyContainer = styled.div`min-height: 100vh;`;
