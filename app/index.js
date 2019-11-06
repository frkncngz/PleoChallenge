import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {logger} from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';

import Expenses from './screens/Expenses';

EStyleSheet.build({
  $white: '#fff',
  $black: '#000',
  $gray: '#999',
  $lightGray: '#b3b3b3',
});
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
