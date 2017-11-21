import {
	CREATE_PLAYER 
} from './../actions'

import uuid from 'uuid';

const initialState = [{
	id: uuid.v4(),
	name: "john",
	color: '#008b02'
}, { 
	id: uuid.v4(),
	name: "carl",
	color: '#006b76'
}]		

export default function players(state = initialState, action) {
	switch(action.type){
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