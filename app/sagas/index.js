import {put, takeLatest, all} from 'redux-saga/effects';

function* fetchNews() {
  const json = yield fetch('http://localhost:3000/expenses').then(response =>
    response.json(),
  );

  yield put({
    type: 'EXPENSES_RECEIVED',
    expenses: json.expenses,
  });
}

function* actionWatcher() {
  yield takeLatest('GET_EXPENSES', fetchNews);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
