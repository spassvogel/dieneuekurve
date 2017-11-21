// Action types

export const CREATE_PLAYER = 'CREATE_PLAYER';



// Action creators

export function createPlayer(id, name, color) {
	return { 
		type: CREATE_PLAYER,
		id,
		name,
		color
	}
}