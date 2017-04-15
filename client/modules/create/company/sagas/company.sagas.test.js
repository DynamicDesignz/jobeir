import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import { redirectTo } from '../ducks'
import {
  createCompany,
  checkCompany,
} from './';

const action = {
  payload: {
    data: {
      company: 'abc'
    }
  }
};

describe('Job', () => {
  describe('creation', () => {
    it('should return a CREATE_COMPANY_SUCCESS action', () => {
      const gen = createCompany(action);

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'POST', '/companies', action.payload.data)
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'CREATE_COMPANY_SUCCESS',
            payload: undefined
          })
        );
    });

    it('should return a CREATE_COMPANY_FAILURE action', () => {
      const gen = createCompany(action);

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'POST', '/companies', action.payload.data)
      );

      expect(
        gen.throw({
          errors: 'unable to create job'
        }).value
      ).toEqual(
        put({
          type: 'CREATE_COMPANY_FAILURE',
          errors: { errors: 'unable to create job' }
        })
      );
    });
  });
});
