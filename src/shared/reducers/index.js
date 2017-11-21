import { combineReducers } from 'redux';
import players from './players'
import currentPlayer from './currentPlayer'

// Root reducer

const main = combineReducers({
	players,
	currentPlayer
});
export default main;

// export default function main(state = initialState, action) {
// 	switch(action.type){
// 		case CREATE_PLAYER:
// 			console.log(action);
// 			return state;
// 			break;
// 		default:
// 			return state;		
// 	} 
// }