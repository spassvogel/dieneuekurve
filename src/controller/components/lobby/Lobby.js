import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerList from './PlayerList';
import { requestPlayerReadyState } from './../../../shared/actions';
import styles from './lobby.less';

class Lobby extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			ready: false
		}
	}
	render() {

		const readyText = `${this.props.ready ? '✔' : ' '} Ready`;

		return <div className={styles['lobby']}>
			<PlayerList { ... this.props }/>
			<button onClick= { this.handleReadyClick.bind(this) } >
				{ readyText }
			</button> 
		</div>
	}

	handleReadyClick() {
		const action = requestPlayerReadyState(this.props.currentPlayer, !this.state.ready, true);
		this.props.dispatch(action);

		if(typeof this.props.playerReady === 'function') {
			this.props.playerReady();
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const player = state.players.find(p => p.id === ownProps.currentPlayer);
	return { 
		players: state.players,
		ready: player && player.ready
	}
}
Lobby.propTypes = {
	currentPlayer: PropTypes.string,
	playerReady: PropTypes.func
};
	
export default connect(
	mapStateToProps
)(Lobby);