import React                            from 'react';
import { render }                       from 'react-dom';
import { Router, browserHistory }       from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware             from 'redux-saga';
import { Provider }                     from 'react-redux';
import { syncHistoryWithStore }         from 'react-router-redux';

import routes  from './routes/routes';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

render(
  <Provider store={store}>
    <Router routes={routes} history={syncHistoryWithStore(browserHistory, store)} />
  </Provider>,
  document.getElementById('app')
);
