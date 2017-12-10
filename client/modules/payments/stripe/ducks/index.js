export const STRIPE_PAYMENT_REQUEST = 'STRIPE_PAYMENT_REQUEST';
export const STRIPE_PAYMENT_SUCCESS = 'STRIPE_PAYMENT_SUCCESS';
export const STRIPE_PAYMENT_FAILURE = 'STRIPE_PAYMENT_FAILURE';

export const FREE_PAYMENT_REQUEST = 'FREE_PAYMENT_REQUEST';
export const FREE_PAYMENT_SUCCESS = 'FREE_PAYMENT_SUCCESS';
export const FREE_PAYMENT_FAILURE = 'FREE_PAYMENT_FAILURE';

export const JOB_PAYMENT_MODAL = 'JOB_PAYMENT_MODAL';

export const initialState = {
  isPaying: false,
  hasPaid: false,
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case STRIPE_PAYMENT_REQUEST:
    case FREE_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        isPaying: true,
        hasPaid: false,
      });
    case STRIPE_PAYMENT_SUCCESS:
    case FREE_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        isPaying: false,
        hasPaid: true,
        ...action.payload.data,
      });
    case STRIPE_PAYMENT_FAILURE:
    case FREE_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        isPaying: false,
        hasPaid: false,
        errors: action.payload.errors,
      });
    default:
      return state;
  }
};

export const stripePaymentRequest = ({ activeCompany, job, token, user }) => ({
  type: STRIPE_PAYMENT_REQUEST,
  payload: {
    company: activeCompany,
    job,
    token,
    user,
  },
});

export const freePaymentRequest = ({ activeCompany, job }) => ({
  type: FREE_PAYMENT_REQUEST,
  payload: { activeCompany, job },
});

export const stripeExistingPaymentRequest = ({
  activeCompany,
  job,
  customer,
  user,
}) => ({
  type: STRIPE_PAYMENT_REQUEST,
  payload: {
    company: activeCompany,
    job,
    customer,
    user,
  },
});
