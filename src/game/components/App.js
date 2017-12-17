import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lobby from './lobby/Lobby';
import Playing from './playing/Playing';
import ControllerApp from './../../controller/components/App'
import styles from './app.less';
import { requestPlaying } from './../../shared/actions';

const NUM_PLAYERS_REQUIRED = 2; // Minimum number of players required to start game
export const GAME_STATES = {
    playing: 'playing',            			 // We be playin'
    waitingForRound: 'waitingForRound',    	 // We wait three seconds and start the next round
    waitingForGame: 'waitingForGame'       // We wait for at least two players to be there and be ready
}

class App extends Component {
	constructor() {
		super();

		this.state = {
			gameState: GAME_STATES.waitingForGame
		}

		this.startRound = this.startRound.bind(this);
	}

	render() {
		const className = styles['app'] + (this.props.className ? ' ' + this.props.className : '');

		let content = null
		switch(this.state.gameState){
			case GAME_STATES.waitingForGame:
				content = <Lobby 
					className={styles['page']}
					numPlayersRequired={NUM_PLAYERS_REQUIRED}
					players={this.props.players}
					serverIP={this.props.serverIP}
				/>;
				break;
			default:
				content = <Playing 
					round={1}
					gameState={this.state.gameState}
					className={styles['page']}
					players={this.props.players }
					startRound={this.startRound}
				/>;
		}
		return (
			<div className={className}>
				{ content }
				<ControllerApp className={styles['local-controller-arrows']}/>
			</div>
		)	
	}

	startRound() {
		this.props.dispatch(requestPlaying(true));
		this.setState({
			gameState: GAME_STATES.playing
		})
	}

	componentWillReceiveProps(nextProps) {
		if(this.state.gameState === GAME_STATES.waitingForGame){
			if(nextProps.players.length >= NUM_PLAYERS_REQUIRED && nextProps.players.every(p => p.ready)){
				this.setState({
					gameState: GAME_STATES.waitingForRound
				})
			}
		}
	}
}
const mapStateToProps = state => {
	return {
		players: state.players,
		serverIP: state.serverIP
	}
}

export default connect(
	mapStateToProps
)(App);