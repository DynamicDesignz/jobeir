// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJob, deleteJob } from '../../../../account/create/job/ducks/';
import JobEditForm from '../../../../user-input/forms/form/JobEditForm';
import JobPosting from './JobPosting';
import JobPostingToggleControls from '../components/JobPostingToggleControls';

/**
 * <Posting />
 * Provides the UI for previewing the posting within the Admin or
 * toggling to edit the posting.
 */
class JobPostingToggle extends Component {
  state = {
    showJobForm: false,
  };

  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  handleEditClick = () => {
    this.setState({ showJobForm: !this.state.showJobForm });
  };

  handleDeleteClick = () => {
    const { companies, dispatch, params } = this.props;
    dispatch(
      deleteJob(companies.activeCompany._id, params.jobId, '/account/jobs'),
    );
  };

  showJobPReview = () => {
    this.setState({ showJobForm: false });
  };

  buildJobEditInitialValues = () => {
    const {
      activePosting: {
        location,
        descriptionRaw,
        employmentType,
        equity,
        externalLink,
        remote,
        role,
        salary,
        title,
      },
    } = this.props;

    return {
      address: JSON.stringify(location.address),
      descriptionRaw,
      employmentType,
      equity: {
        max: equity.max,
        min: equity.min,
        offer: equity.offer,
      },
      externalLink,
      remote,
      role,
      salary: {
        max: salary.max,
        min: salary.min,
      },
      title,
    };
  };

  render() {
    const { activePosting, params } = this.props;

    return (
      <JobPostingContainer>
        <JobPostingToggleControls
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
        />
        {this.state.showJobForm ? (
          <JobEditForm
            initialValues={this.buildJobEditInitialValues()}
            params={params}
            showJobPReview={this.showJobPReview}
          />
        ) : (
          <JobPosting activePosting={activePosting} params={params} />
        )}
      </JobPostingContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  companies: state.account.companies,
  jobs: state.account.jobs,
  activePosting:
    state.account.jobs.postings.find(
      posting => posting._id === ownProps.params.jobId,
    ) || {},
});

export default connect(mapStateToProps)(JobPostingToggle);

const JobPostingContainer = styled.div`margin-top: 50px;`;
