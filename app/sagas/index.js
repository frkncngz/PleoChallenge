import axios from 'axios';
import qs from 'qs';
import {put, takeLatest, all} from 'redux-saga/effects';
import config from '../config';

function* fetchExpenses(action) {
  const {limit, offset} = action;

  const json = yield axios
    .get(`${config.apiUrl}/expenses`, {
      params: {
        limit,
        offset,
      },
    })
    .then(response => response.data);

  yield put({
    type: 'EXPENSES_RECEIVED',
    expenses: json.expenses,
    totalExpenses: json.total,
  });
}

function* updateExpense(action) {
  const {id, comment} = action;

  const data = {comment};
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(data),
    url: `${config.apiUrl}/expenses/${id}`,
  };
  const json = yield axios(options).then(response => response.data);

  yield put({
    type: 'EXPENSE_UPDATED',
    expense: json,
  });
}

function* uploadReceipt(action) {
  const {id, file} = action;

  const data = new FormData();
  data.append('receipt', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });

  const options = {
    method: 'POST',
    url: `${config.apiUrl}/expenses/${id}/receipts`,
    data: data,
  };

  const json = yield axios(options).then(response => response.data);

  yield put({
    type: 'EXPENSE_UPDATED',
    expense: json,
  });
}

function* actionGetExpenses() {
  yield takeLatest('GET_EXPENSES', fetchExpenses);
}

function* actionUpdateExpenses() {
  yield takeLatest('UPDATE_EXPENSE', updateExpense);
}

function* actionUploadReceipt() {
  yield takeLatest('UPLOAD_RECEIPT', uploadReceipt);
}

export default function* rootSaga() {
  yield all([
    actionGetExpenses(),
    actionUpdateExpenses(),
    actionUploadReceipt(),
  ]);
}
