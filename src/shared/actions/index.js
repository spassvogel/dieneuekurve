// Action types
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const REQUEST_PLAYER_CREATE = 'REQUEST_PLAYER_CREATE';


// Action creators

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
 * This action requests the server to create a new player
 * Will call back with ADD_PLAYERS
 * @param {string} id
 * @param {string} name 
 * @param {string} color 
 */
export function requestPlayerCreate(id, name, color) {
	return { 
		type: REQUEST_PLAYER_CREATE,
		id,
		name,
		color
	}
}