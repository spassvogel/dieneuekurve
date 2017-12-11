import {
	SET_SERVER_IP,
} from './../actions'

// Server IP reducer. Is only used on the game client

export default function ready(state = null, action) {
	switch(action.type){
		
		case SET_SERVER_IP:
			return action.ip;				
			
		default:
			return state;		
	} 
}