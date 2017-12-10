import Game from './Game';
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import App from './../controller/components/App'
import root from './../shared/reducers/root';
import * as actions from './../shared/actions';

const socket = io('http://' + window.location.host);
const store = createStore(root, 
	applyMiddleware(logger, createSocketIoMiddleware(socket, "REQUEST"))
);

// const rootEl = document.getElementById('app');
// const render = () => {
// 	ReactDOM.render(
// 		<Provider store={store}>
// 			<App/>
// 		</Provider>,
// 		rootEl
// 	);
// };
// render();

const canvas = document.getElementById('canvas');
const game = new Game(canvas, store);
store.dispatch({ type:'REQUEST_PLAYERS' });

//init();