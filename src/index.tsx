import * as React from 'react';
import * as ReactDOM from 'react-dom';

import axios from 'axios';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';

// Redux --------------------------------------
const rooReducer = combineReducers({
  auth: authReducer
});

// Middleware Example
// tslint:disable-next-line:no-shadowed-variable
const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      // tslint:disable-next-line:no-console
      // console.log('[Middleware] Dispatching', action);
      const result = next(action);
      // tslint:disable-next-line:no-console
      // console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

// Redux DevTools -----
declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// End Redux DevTools -----

const store = createStore(
  rooReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);
// End Redux ----------------------------------


const backendUrl = `/'


axios.defaults.baseURL = backendUrl;
// axios.defaults.headers.common.Authorization = "AUTH TOKEN";
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  request => {
    // tslint:disable-next-line:no-console
    console.log(request);
    // Edit request config
    return request;
  },
  error => {
    // tslint:disable-next-line:no-console
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // tslint:disable-next-line:no-console
    console.log(response);
    // Edit request config
    return response;
  },
  error => {
    // tslint:disable-next-line:no-console
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
