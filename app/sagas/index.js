import {put, takeLatest, all} from 'redux-saga/effects';

function* fetchNews(action) {
  const {limit, offset} = action;
  console.log('/fetchNews');
  const json = yield fetch(
    `http://localhost:3000/expenses?limit=${limit}&offset=${offset}`,
  ).then(response => response.json());

  yield put({
    type: 'EXPENSES_RECEIVED',
    expenses: json.expenses,
    totalExpenses: json.total,
  });
}

function* actionWatcher() {
  yield takeLatest('GET_EXPENSES', fetchNews);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
