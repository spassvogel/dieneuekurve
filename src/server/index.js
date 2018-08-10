import express from 'express';
import path from 'path';
import http from 'http';
import SocketIO from 'socket.io';
import uuid from 'uuid';
import * as actions from './../shared/actions';
import mobile from 'is-mobile';
import ip from "ip";

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

const players = []	

io.on('connection', function(socket){
	console.log('a client connected from ' + socket.request.connection.remoteAddress);
	let playerID = null;
	
	if(socket.handshake.query.client === 'game') {
		io.emit('action', actions.setServerIP(`${ip.address()}:${port}`));
	}

	socket.on('disconnect', () => {
		console.log('disconnecting player ' + playerID)
		const index = players.findIndex(p => p.id === playerID);		
		if (index !== -1) {
			players.splice(index, 1);
		}
		// Removes player from all other clients
		io.emit('action', actions.removePlayer(playerID));
	});
	socket.on('action', (action) => {

		console.log(action.type)

		switch(action.type) {

			case actions.REQUEST_PLAYERS:
				// Responds with ADD_PLAYERS and passes all players currently joined
				socket.emit('action', actions.addPlayers(players));
				break;

			case actions.REQUEST_PLAYER_CREATE: {
				// Adds the given player to the joined player list and emits 
				// ADD_PLAYERS to all clients, passing the newly created player
				playerID = action.id;
				const player = { 
					id: action.id, 
					name: action.name, 
					color: action.color,
					ready: false
				};
				players.push(player);

				io.emit('action', actions.addPlayers([player]));
				break;
			}

			case actions.REQUEST_PLAYER_READY_STATE: {
				// Sets ready state for given player. Emits SET_PLAYER_READY_STATE				
				const player = players.find(p => p.id === action.id);
				if(player) {
					player.ready = action.ready;
				}

				io.emit('action', actions.setPlayerReadyState(action.id, action.ready));
				break;
			}

			case actions.REQUEST_PLAYER_REMOVE: {
				// Removes player from list
				const index = players.findIndex(p => p.id === action.id);		
				if (index !== -1) {
					players.splice(index, 1);
				}
				io.emit('action', actions.removePlayer(action.id));
				break;
			}

			case actions.REQUEST_PLAYING: {
				// Sets playing state. Emits SET_PLAYING				
				io.emit('action', actions.setPlaying(action.playing));
				break;
			}

		}
	});
 });


app.use('/dist', express.static('./dist'));
app.get('/controller?*', (request, response) => {
	response.sendFile('controller.html', { root: './'});
});
app.get('/game*', (request, response) => {
	response.sendFile('game.html', { root: './'});
});
app.use('/', (request, response) => {
	if(mobile()){
		response.sendFile('controller.html', { root: './'});
	} 
	else {
		response.sendFile('game.html', { root: './'});		
	}		
});

server.listen(port, () => console.log(`Server running on port: ${port}`));
