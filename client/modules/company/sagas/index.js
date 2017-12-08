import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
} from '../ducks';

export function* getCompany(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/companies/${action.payload.companyName}`,
    );
    yield put({ type: GET_COMPANY_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: GET_COMPANY_FAILURE, errors });
  }
}

export function* company() {
  yield takeEvery(GET_COMPANY_REQUEST, getCompany);
}
