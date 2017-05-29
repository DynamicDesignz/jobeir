import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import CompanyFormAbout from './CompanyFormAbout';
import CompanyFormContact from './CompanyFormContact';
import CompanyFormLocation from './CompanyFormLocation';

class CompanyForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage(path) {
    browserHistory.push(path);
  }

  prevPage(path) {
    browserHistory.push(path);
  }

  render() {
    const { pathname } = this.props;
    const about = '/create/company/about';
    const contact = '/create/company/contact';
    const location = '/create/company/location';

    return (
      <div>
        {pathname === about &&
          <CompanyFormAbout nextPage={() => this.nextPage(contact)} />}
        {pathname === contact &&
          <CompanyFormContact
            prevPage={() => this.prevPage(about)}
            nextPage={() => this.nextPage(location)}
          />}
        {pathname === location &&
          <CompanyFormLocation prevPage={() => this.prevPage(contact)} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(CompanyForm);
