import {
	SET_PLAYER_READY_STATE,
} from './../actions'

// Ready reducer. Ready means this client clicked ready in the Lobby
// It's a section reducer that also receives the state of the section

export default function ready(state = false, action, sectionState) {
	switch(action.type){
		
		case SET_PLAYER_READY_STATE:
			// Change ready state only if set for the clients' player
			if (action.id === sectionState.currentPlayer){
				return action.ready;				
			}
		default:
			return state;		
	} 
}