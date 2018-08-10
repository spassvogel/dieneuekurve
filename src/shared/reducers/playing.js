import {
	SET_PLAYING,
} from './../actions'

// Ready reducer. Playing means this client is playing the game
// It's a section reducer that also receives the state of the section

export default function ready(state = false, action, sectionState) {
	switch(action.type){
		
		case SET_PLAYING:
			// Change playing state only if joined
			//if (sectionState.currentPlayer){
				return action.playing;				
			//}
		default:
			return state;		
	} 
}