import combineSectionReducers from 'combine-section-reducers';
import players from './players';
import currentPlayer from './currentPlayer';
import ready from './ready';
import playing from './playing';
import serverIP from './serverIP';

// Root reducer
const root = combineSectionReducers({
	players,
	currentPlayer,
	ready,
	playing,
	serverIP
});
export default root;
