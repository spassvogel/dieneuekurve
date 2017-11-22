import {
	REQUEST_PLAYER_CREATE 
} from './../actions'

export default function currentPlayer(state = null, action) {
	switch(action.type){
		case REQUEST_PLAYER_CREATE:
			return action.id;
		default:
			return state;		
	} 
}