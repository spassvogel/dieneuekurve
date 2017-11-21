import {
	CREATE_PLAYER 
} from './../actions'

export default function currentPlayer(state = null, action) {
	switch(action.type){
		case CREATE_PLAYER:
			return action.id;
			break;
		default:
			return state;		
	} 
}