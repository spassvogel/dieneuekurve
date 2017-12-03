import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux';
import uuid from 'uuid';

import App from './components/App'
import root from './../shared/reducers/root';
import * as actions from './../shared/actions';

const socket = io('http://' + window.location.host);
const store = createStore(root, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),	
	applyMiddleware(createSocketIoMiddleware(socket, "REQUEST"))
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

// For debugging, see if 'name' and 'color' are present in the query string
if (process.env.NODE_ENV !== 'production') {
	const queryString = require('query-string');
	const { name, color, ready } = queryString.parse(location.search);
	if(name && color){
		const id = uuid.v4();
		store.dispatch(actions.requestPlayerCreate(id, name, color));	

		if(ready){
			store.dispatch(actions.setPlayerReadyState(id, true));
		}	
	}
}
