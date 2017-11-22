import { connect } from 'react-redux';
import React, { Component } from 'react';
import PlayerList from './PlayerList';
import { requestPlayerReadyState } from './../../../shared/actions';
import {} from './lobby.less';

class Lobby extends Component {
	constructor(props) {
    	super(props);
	}
	render() {

		const readyText = `${this.props.ready ? '✔' : ' '} Ready`;
		return <div className='lobby'>
			<PlayerList { ... this.props }/>
			<button onClick= { this.handleReadyClick.bind(this) } >
				{ readyText }
			</button> 
		</div>
	}

	handleReadyClick() {
		const action = requestPlayerReadyState(this.props.currentPlayer, !this.props.ready);
		this.props.dispatch(action);
	}
}

const mapStateToProps = state => {

	//const ready = state.players.find(p => p.id === state.currentPlayer).ready;
	return { 
		players: state.players,
		ready: state.ready,
		currentPlayer: state.currentPlayer,
	}
}

const ready = state=> {
	return 'bla';
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onReadyClick: evt => {
			console.log(ownProps.ready)
		 	//dispatch(toggleTodo(id))
		}
	}
}
	
export default connect(
	mapStateToProps
)(Lobby);