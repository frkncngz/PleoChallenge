import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';

import Expenses from './screens/Expenses';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

export default () => (
  <>
    <Provider store={store}>
      <Expenses />
    </Provider>
  </>
);
