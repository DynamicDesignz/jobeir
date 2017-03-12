import React from 'react';
import { connect } from 'react-redux';

import AuthModal from '../../auth/containers/AuthModal';

const MODAL_COMPONENTS = {
  'AUTH_MODAL': AuthModal,
};

const Modal = ({ modalType, modalProps }) => {
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    <div>
      {modalType && <SpecificModal {...modalProps} />}
    </div>
  );
};

const mapStateToProps = state => state.modal;

export default connect(mapStateToProps)(Modal);