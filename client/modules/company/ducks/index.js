// @flow
export const GET_COMPANY_REQUEST = 'GET_COMPANY_REQUEST';
export const GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
export const GET_COMPANY_FAILURE = 'GET_COMPANY_FAILURE';

export const SERVER_GET_COMPANY_REQUEST = 'SERVER_GET_COMPANY_REQUEST';
export const SERVER_GET_COMPANY_SUCCESS = 'SERVER_GET_COMPANY_SUCCESS';
export const SERVER_GET_COMPANY_FAILURE = 'SERVER_GET_COMPANY_FAILURE';

export const RESET_COMPANY = 'RESET_COMPANY';

export const initialState: {
  isFetching: boolean,
} = {
  isFetching: false,
  isLoaded: false,
  jobs: [],
};

export default (state?: {} = initialState, action?: {} = {}) => {
  switch (action.type) {
    case SERVER_GET_COMPANY_REQUEST:
    case GET_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case SERVER_GET_COMPANY_SUCCESS:
    case GET_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        ...action.payload.data.company,
        errors: [],
      });
    case SERVER_GET_COMPANY_FAILURE:
    case GET_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.errors.errors,
      });
    case RESET_COMPANY:
      return initialState;
    default:
      return state;
  }
};

export function shouldGetCompany(globalState: {
  company: { isFetching: boolean },
  session: { auth: { globalIsLoaded: boolean } },
}) {
  const isFetching = globalState.company && globalState.company.isFetching;
  const isLoaded = globalState.session.auth.globalIsLoaded;

  return !isFetching && !isLoaded;
}

export const getCompany = (companyName: string) => ({
  type: GET_COMPANY_REQUEST,
  payload: { companyName },
});

export const resetCompany = () => ({
  type: RESET_COMPANY,
});
