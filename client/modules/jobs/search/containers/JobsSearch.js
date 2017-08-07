// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import { serverGetJobs } from '../server/';
import {
  shouldGetJobs,
  searchJobs,
  resetJobs,
  filterSearchJobs
} from '../ducks/';
import JobsSearchSidebar from './JobsSearchSidebar';
import JobsSearchPosting from '../components/JobsSearchPosting';
import JobsSearchHeading from '../components/JobsSearchHeading';
import SearchForm from '../../../user-input/forms/form/search/SearchForm';
import FadeIn from '../../../../styles/components/FadeIn';

/**
 * Loading jobs from the server on initial load. This will SSR the first
 * jobs posts and allow infinite scroll to do the rest
 */
@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state = getState();

      if (shouldGetJobs(state)) {
        return dispatch(serverGetJobs(req.query, req));
      }
    }
  }
])
class JobsSearch extends Component {
  state: {
    hasMore: boolean
  };

  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.search);
    const initialValues = {
      location: parsed.l,
      title: parsed.q,
      lat: parsed.lat,
      lng: parsed.lng,
      employmentType: parsed.et,
      equity: parsed.eq,
      distance: parsed.d,
      remote: parsed.r,
      companySize: parsed.cs
    };

    this.state = { hasMore: true, initialValues };
  }

  componentDidMount() {
    const { dispatch, jobs: { isLoaded }, query } = this.props;
    const queryData = queryString.stringify(query);

    // Only load jobs on mount if the jobs haven't been rendered
    if (!isLoaded) {
      dispatch(searchJobs(queryData));
    }
  }

  componentDidUpdate(prevProps) {
    const { query, dispatch } = this.props;
    if (
      JSON.stringify(prevProps.query) !== JSON.stringify(query) &&
      Object.keys(query).length
    ) {
      dispatch(filterSearchJobs(queryString.stringify(query)));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetJobs());
  }

  loadMoreJobs = (): void => {
    const {
      dispatch,
      jobs: { count, isFetching, isLoaded },
      query
    } = this.props;
    const currentStart = parseInt(query.s, 10) || 0;
    // Creating a new updated query with the correct start position
    const updatedQuery = queryString.stringify({
      l: query.l,
      q: query.q,
      s: currentStart + 15,
      lat: query.lat,
      lng: query.lng
    });

    /**
     * Setting state to now load more job postings if there are no more
     * postings to retrieve from the server
     */
    if (currentStart + 15 > count && isLoaded) {
      return this.setState({ hasMore: false });
    }

    if (!isFetching && isLoaded) {
      dispatch(searchJobs(updatedQuery));
      browserHistory.replace(`/jobs/?${updatedQuery}`);
    }
  };

  /**
   * buildJobPostings
   * <InfiniteScroll /> expects an array of React elements to be passed as
   * children so we have to create an array and push all the job postings
   * items into it. This will render the list within the UI
   */
  buildJobPostings() {
    return this.props.jobs.postings.map(posting =>
      <FadeIn key={posting._id}>
        <JobsSearchPosting posting={posting} />
      </FadeIn>
    );
  }

  render() {
    const { initialValues } = this.state;

    return (
      <JobsSearchContainer>
        <JobsSearchRow>
          <SearchForm location="jobs" initialValues={initialValues} />
        </JobsSearchRow>
        <JobsSearchRow>
          <JobsSearchColumn margin>
            <JobsSearchSidebar initialValues={initialValues} />
          </JobsSearchColumn>
          <JobsSearchColumn wide>
            <InfiniteScroll
              pageStart={0}
              threshold={600}
              loadMore={this.loadMoreJobs}
              hasMore={this.state.hasMore}
              loader={<div className="loader">Loading ...</div>}
            >
              {this.buildJobPostings()}
            </InfiniteScroll>
          </JobsSearchColumn>
        </JobsSearchRow>
      </JobsSearchContainer>
    );
  }
}

const mapStateToProps = state => ({
  query:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.query,
  search:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.search,
  jobs: state.search.jobs
});

export default connect(mapStateToProps)(JobsSearch);

const JobsSearchContainer = styled.div`
  background: #fff;
  min-height: calc(100vh - 75px);
`;

const JobsSearchRow = styled.div`
  display: flex;
  justify-content: center;
  width: 1100px;
  margin: 0 auto;
`;

const JobsSearchColumn = styled.div`
  margin-right: ${props => (props.margin ? '100px' : '0px')};
  flex: ${props => (props.wide ? '1.3' : '0.7')};
`;
