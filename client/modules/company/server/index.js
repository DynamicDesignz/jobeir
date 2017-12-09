import { CALL_API } from 'redux-api-middleware';
import { formatUrl, reqHeaders } from '../../../utils/api';
import {
  SERVER_GET_COMPANY_REQUEST,
  SERVER_GET_COMPANY_SUCCESS,
  SERVER_GET_COMPANY_FAILURE,
} from '../ducks';

export function serverGetCompany(originalUrl, req) {
  const endpoint = formatUrl(originalUrl);

  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        SERVER_GET_COMPANY_REQUEST,
        {
          type: SERVER_GET_COMPANY_SUCCESS,
          payload: (action, state, response) =>
            response.json().then(res => res),
        },
        {
          type: SERVER_GET_COMPANY_FAILURE,
          payload: (action, state, response) =>
            response.json().then(res => res),
        },
      ],
    },
  };
}
