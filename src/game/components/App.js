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
			gameState: GAME_STATES.waitingForGame,
			localPlayers: {
				'zx': null,				// null = not present, 'new' = dialogue open, (other) = player id, ready
				'arrows': null			// null = not present, 'new' = dialogue open, (other) = player id, ready
			}
		}

		this.startRound = this.startRound.bind(this);
		this.handleZxButtonClicked = this.handleZxButtonClicked.bind(this);
		this.handleArrowsButtonClicked = this.handleArrowsButtonClicked.bind(this);
		this.handleZxPlayerReady = this.handleZxPlayerReady.bind(this);
		this.handleArrowsPlayerReady = this.handleArrowsPlayerReady.bind(this);
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
					localPlayers={this.state.localPlayers}
					zxButtonClicked={this.handleZxButtonClicked}
					arrowsButtonClicked={this.handleArrowsButtonClicked}
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
		
		let playerZXController;
		if(this.state.localPlayers['zx'] === 'new') {
			playerZXController = <ControllerApp className = { styles['local-controller-zx'] }
				playerName = 'player1'
				playerReady = { this.handleZxPlayerReady  }
				title = 'Local player using: "z" and "x"'
			/>
		}
		let playerArrowsController;
		if(this.state.localPlayers['arrows'] === 'new') {
			playerArrowsController = <ControllerApp className = { styles['local-controller-arrows'] }
				playerName = 'player2'
				playerReady = { this.handleArrowsPlayerReady  }
				title = '"left" and "right"'
			/>
		}


		return (
			<div className={className}>
				{ content }
				{ playerZXController }
				{ playerArrowsController }
			</div>
		)	
	}

	startRound() {
		this.props.dispatch(requestPlaying(true));
		this.setState({
			gameState: GAME_STATES.playing
		})
	}

	/**
	 * Handles clicking on the 'arrows' local player button */	
	handleArrowsButtonClicked() {
		// Toggle state between null and 'new' 
		this.setState({
			localPlayers: { 
				...this.state.localPlayers,
				'arrows':  this.state.localPlayers['arrows'] === null ? 'new' : null
			}
		})
	}

	/**
	 * Handles clicking on the 'zx' local player button */	
	handleZxButtonClicked() {
		if(this.state.localPlayers['zx'] !== null && this.state.localPlayers['zx'] !== 'new'){
			
		}
		// Toggle state between null and 'new'
		this.setState({
			localPlayers: { 
				...this.state.localPlayers,
				'zx':  this.state.localPlayers['zx'] === null ? 'new' : null
			}
		})
	}

	handleZxPlayerReady(id){
		this.setState({
			localPlayers: { 
				...this.state.localPlayers,
				'zx':  id
			}
		})
	}

	handleArrowsPlayerReady(id){
		this.setState({
			localPlayers: { 
				...this.state.localPlayers,
				'arrows':  id
			}
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