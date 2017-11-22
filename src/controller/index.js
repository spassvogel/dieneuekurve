import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux';
import logger from 'redux-logger'

import App from './components/App'
import root from './../shared/reducers/root';

let socket = io('http://' + window.location.host);
const store = createStore(root, 
	applyMiddleware(logger, createSocketIoMiddleware(socket, "REQUEST"))
);
store.dispatch({ type:'REQUEST_PLAYERS' });

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
