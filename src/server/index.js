import express from 'express';
import path from 'path';

const app = express();

app.use('/dist', express.static('./dist'));
app.get('/controller.html', (request, response) => {
	response.sendFile('controller.html', { root: './'});
});

app.listen(3000, () => console.log('Server running'));