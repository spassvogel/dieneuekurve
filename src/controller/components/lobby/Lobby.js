import { connect } from 'react-redux';
import PlayerList from './PlayerList';

const mapStateToProps = state => {
	return { 
		players: state.players		
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// onTodoClick: id => {
		// 	dispatch(toggleTodo(id))
		// }
	}
}

const Lobby = connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerList);
	
export default Lobby;