import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'

import App from './components/App'
import main from './../shared/reducers';

const store = createStore(main, applyMiddleware(logger));

const rootEl = document.getElementById('app');
const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App/>
		</Provider>,
		rootEl
	);
};
render();
