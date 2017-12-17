import React, { Component } from 'react';
import { connect } from 'react-redux';
import JoinPlayer from './joinplayer/JoinPlayer';
import Lobby from './lobby/Lobby';
import GameController from './gamecontroller/GameController';
import styles from './app.less';

const CLASS_NAME = styles['app'];

class App extends Component {
	render() {
		const className = CLASS_NAME + (this.props.className ? ' ' + this.props.className : '');
		let content;
		if(this.props.currentPlayer === null) {
			content = <JoinPlayer localMode={this.props.localMode}/>;
		} else if (!this.props.playing) {
			content = <Lobby/>			
		} else {
			content = <GameController />
		}
		return (
			<div className={className}>
				{ content}
			</div>
		);
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