import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { tempSetUser, check } from './modules/user';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(logger, ReduxThunk, sagaMiddleware))
);
function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; //로그인 상태가 아니라면 아무것도 하지 않는다.
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadUser();

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
