import express from 'express';
import path from 'path';
import { createStore } from 'redux';
import main from './../shared/reducers';

const store = createStore(main);
const app = express();

app.use('/dist', express.static('./dist'));
app.get('/controller.html', (request, response) => {
	response.sendFile('controller.html', { root: './'});
});

app.listen(3000, () => console.log('Server running'));