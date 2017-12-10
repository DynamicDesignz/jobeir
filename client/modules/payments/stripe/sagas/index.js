import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  STRIPE_PAYMENT_REQUEST,
  STRIPE_PAYMENT_SUCCESS,
  STRIPE_PAYMENT_FAILURE,
  FREE_PAYMENT_REQUEST,
  FREE_PAYMENT_SUCCESS,
  FREE_PAYMENT_FAILURE,
} from '../ducks';

export function* freePayment(action) {
  try {
    const payload = yield call(
      fetchApi,
      'POST',
      `/payments/free`,
      action.payload,
    );
    yield put({ type: FREE_PAYMENT_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: FREE_PAYMENT_FAILURE, errors });
  }
}

export function* stripePayment(action) {
  try {
    const payload = yield call(
      fetchApi,
      'POST',
      `/payments/stripe`,
      action.payload,
    );
    yield put({ type: STRIPE_PAYMENT_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: STRIPE_PAYMENT_FAILURE, errors });
  }
}

export function* payments() {
  yield takeEvery(FREE_PAYMENT_REQUEST, freePayment);
  yield takeEvery(STRIPE_PAYMENT_REQUEST, stripePayment);
}
