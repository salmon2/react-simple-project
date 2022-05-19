import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(logger, ReduxThunk))
);

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
