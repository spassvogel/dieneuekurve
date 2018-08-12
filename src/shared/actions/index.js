// Action types
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const REQUEST_CONTROL = 'REQUEST_CONTROL';
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const REQUEST_PLAYER_CREATE = 'REQUEST_PLAYER_CREATE';
export const REQUEST_PLAYER_READY_STATE = 'REQUEST_PLAYER_READY_STATE';
export const REQUEST_PLAYER_REMOVE = 'REQUEST_PLAYER_REMOVE';
export const REQUEST_PLAYING = 'REQUEST_PLAYING';
export const SET_PLAYER_READY_STATE = 'SET_PLAYER_READY_STATE';
export const SET_PLAYING = 'SET_PLAYING';
export const SET_SERVER_IP = 'SET_SERVER_IP';

// All actions that start with 'REQUEST' will go through the middleware

// Action creators
/**
 * This action is a callback from REQUEST_PLAYERS
 * Will add all players in `players` to the store
 * @param {Array} players 
 */
export function addPlayers(players) {
	return { 
		type: ADD_PLAYERS,
		players
	}
}
/**
 * This action removes a player from the player list
 * @param {string} id of player to remove
 */
export function removePlayer(id) {
	return { 
		type: REMOVE_PLAYER,
		id
	}
}

/**
 * This action sends a control action
 * @param {string} control 'left' or 'right'
 * @param {boolean} pressed indicates wether pressed or released
 */
export function requestControl(control, pressed = true) {
	return { 
		type: REQUEST_CONTROL,
		control,
		pressed
	}
}

/**
 * This action requests the list of players from the server.
 * Will call back with ADD_PLAYERS
 */
export function requestPlayers() {
	return { 
		type: REQUEST_PLAYERS
	}
}

/**
 * This action requests the server to create a new player
 * Will call back with ADD_PLAYERS
 * @param {string} id of player to create
 * @param {string} name of player to create
 * @param {string} color of player to create
 */
export function requestPlayerCreate(id, name, color) {	
	return { 
		type: REQUEST_PLAYER_CREATE,
		id,
		name,
		color
	}
}

/**
 * This action requests the server to remove a player
 * Will call back with REMOVE_PLAYER
 * @param {string} id
 */
export function requestPlayerRemove(id) {
	return {
		type: REQUEST_PLAYER_REMOVE,
		id
	}
}

/**
 * This action requests the server to set the 'ready' flag
 * on a player. This gets called from the Lobby
 * Will call back with SET_PLAYER_READY_STATE
 * @param {string} id
 * @param {boolean} ready
 * @param {boolean} local true if local player, false if remote controller
 */
export function requestPlayerReadyState(id, ready, local) {
	return {
		type: REQUEST_PLAYER_READY_STATE,
		id,
		ready,
		local
	}
}

/**
 * This action requests the server to set the 'playing' flag
 * Will call back with SET_PLAYING
 * @param {boolean} playing
 */
export function requestPlaying(playing) {
	return {
		type: REQUEST_PLAYING,
		playing
	}
}


/**
 * This action is called from the server to set the 'ready' flag
 * on a player. 
 * @param {boolean} ready
 */
export function setPlayerReadyState(id, ready) {
	return {
		type: SET_PLAYER_READY_STATE,
		id,
		ready
	}
}

/**
 * This action is called from the server to set the 'playing' flag
 * @param {boolean} playing
 */
export function setPlaying(playing) {
	return {
		type: SET_PLAYING,
		playing
	}
}


/**
 * This action is called from the server to set the ip address of the server
 * @param {string} ip 
 */
export function setServerIP(ip) {
	return {
		type: SET_SERVER_IP,
		ip
	}
}

