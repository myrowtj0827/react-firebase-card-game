import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker_';
import store from './store';
import App from './App';
import './index.css';

const renderApp = () =>
    render(
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <App/>
            </PersistGate>
        </Provider>,
        document.getElementById(`root`),
    );

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
