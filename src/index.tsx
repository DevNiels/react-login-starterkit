import * as React from 'react';
import * as ReactDOM from 'react-dom';

import axios from 'axios';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';

// Redux --------------------------------------
const rooReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rooReducer);
// End Redux ----------------------------------

const backendUrl = '/';

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
