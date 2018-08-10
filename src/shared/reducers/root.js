import combineSectionReducers from 'combine-section-reducers';
import players from './players';
import playing from './playing';
import serverIP from './serverIP';

// Root reducer
const root = combineSectionReducers({
	players,
	playing,
	serverIP
});
export default root;
