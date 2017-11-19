import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

const rootEl = document.getElementById('app');
const render = () => {
	ReactDOM.render(
		<App/>,
		rootEl
	);
};
render();
