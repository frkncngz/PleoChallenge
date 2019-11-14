import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {logger} from 'redux-logger';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Redux
import reducer from './reducers';
import rootSaga from './sagas';

// Screens
import Expenses from './screens/Expenses';
import Receipts from './screens/Receipts';

EStyleSheet.build({
  $white: '#ffffff',
  $whiteTwo: '#f8f8f8',
  $black: '#343434',
  $veryLightPink: '#dedede',
  $veryLightPinkTwo: '#dbdbdb',
  $brownGrey: '#b4b4b4',
  $greyishBrown: '#494949',
  $brownGreyTwo: '#797979',
  $skyBlue: '#64b5f6',
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

const AppNavigator = createStackNavigator({
  Expenses: {
    screen: Expenses,
  },
  Receipts: {
    screen: Receipts,
  },
});
const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </>
);
