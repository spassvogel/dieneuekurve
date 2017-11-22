import {
	CREATE_PLAYER,
	ADD_PLAYERS
} from './../actions'

import uuid from 'uuid';

export default function players(state = [], action) {
	switch(action.type){
		case ADD_PLAYERS: 
			return [ ...state, ...action.players];
			break;
		case CREATE_PLAYER:
			const { id, name, color } = action;
			return [ ...state, {
				id,
				name,
				color
			}];
			break;
		default:
			return state;		
	} 
}