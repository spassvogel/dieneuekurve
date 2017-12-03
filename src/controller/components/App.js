import React, { Component } from 'react';
import { connect } from 'react-redux';
import JoinPlayer from './joinplayer/JoinPlayer';
import Lobby from './lobby/Lobby';
import GameController from './gamecontroller/GameController';
import {} from './app.less';

class App extends Component {
	render() {
		if(this.props.currentPlayer === null) {
			return  <JoinPlayer/>;
		} else if (!this.props.playing) {
			return <Lobby/>			
		} else {
			return <GameController />
		}
	}
}
const mapStateToProps = state => {
	return {
		currentPlayer: state.currentPlayer,
		playing: state.playing
	}
}

export default connect(
	mapStateToProps
)(App);