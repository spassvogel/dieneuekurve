import express from 'express';
import path from 'path';
import http from 'http';
import SocketIO from 'socket.io';
import uuid from 'uuid';
import * as actions from './../shared/actions';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

const players = [{
	id: uuid.v4(),
	name: "johnny",
	color: '#008b02'
}, { 
	id: uuid.v4(),
	name: "carl",
	color: '#006b76'
}]	

io.on('connection', function(socket){

	console.log('a client connected from ' + socket.request.connection.remoteAddress);
	socket.on('action', (action) => {
		switch(action.type) {

			case actions.REQUEST_PLAYERS:			
				socket.emit('action', actions.addPlayers(players));
				break;

			case actions.REQUEST_PLAYER_CREATE:
				const player = { 
					id: action.id, 
					name: action.name, 
					color: action.color
				};
				players.push(player);
				socket.emit('action', actions.addPlayers([player]));
				break;
				
		}
	});
 });

app.use('/dist', express.static('./dist'));
app.get('/controller.html', (request, response) => {
	response.sendFile('controller.html', { root: './'});
});

server.listen(port, () => console.log(`Server running on port: ${port}`));
