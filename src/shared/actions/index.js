// Action types
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const REQUEST_CONTROL = 'REQUEST_CONTROL';
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const REQUEST_PLAYER_CREATE = 'REQUEST_PLAYER_CREATE';
export const REQUEST_PLAYER_READY_STATE = 'REQUEST_PLAYER_READY_STATE';
export const SET_PLAYER_READY_STATE = 'SET_PLAYER_READY_STATE';
export const SET_PLAYING = 'SET_PLAYING';


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
 * This action requests the server to set the 'ready' flag
 * on a player. Will call back with SET_PLAYER_READY_STATE
 * @param {string} id
 * @param {boolean} ready
 */
export function requestPlayerReadyState(id, ready) {
	return {
		type: REQUEST_PLAYER_READY_STATE,
		id,
		ready
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

