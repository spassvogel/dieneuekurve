import Game from './Game';
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux';
//import logger from 'redux-logger';

import App from './components/App';
import root from './../shared/reducers/root';
import * as actions from './../shared/actions';

const socket = io('http://' + window.location.host,  { query: "client=game" });
const store = createStore(root, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),	
	applyMiddleware(createSocketIoMiddleware(socket, "REQUEST"))
);

const rootEl = document.body;
const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App/>
		</Provider>,
		rootEl
	);
};
render();

store.dispatch({ type:'REQUEST_PLAYERS' });
