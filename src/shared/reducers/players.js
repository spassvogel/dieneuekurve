import {
	ADD_PLAYERS,
	REMOVE_PLAYER,
	SET_PLAYER_READY_STATE
} from './../actions'


export default function players(state = [], action) {
	switch(action.type){
		case ADD_PLAYERS: 
			// Return new players array with added players
			return [ ...state, ...action.players];

		case REMOVE_PLAYER: 
			// Return new players array with player removed
			return state.filter(p => p.id !== action.id);

		case SET_PLAYER_READY_STATE:
			// Return players array where the player whose ready state is 
			// changed is new 
			return state.map( p => {
				if(p.id !== action.id) {
					return p;
				}
				return {
					...p,
					ready: action.ready
				};    
		});
		default:
			return state;		
	} 
}