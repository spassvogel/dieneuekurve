import combineSectionReducers from 'combine-section-reducers';
import players from './players';
import currentPlayer from './currentPlayer';
import ready from './ready';
import playing from './playing';

// Root reducer
const root = combineSectionReducers({
	players,
	currentPlayer,
	ready,
	playing
});
export default root;

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