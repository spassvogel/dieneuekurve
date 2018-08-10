import React, { Component } from 'react';
import { connect } from 'react-redux';
import JoinPlayer from './joinplayer/JoinPlayer';
import Lobby from './lobby/Lobby';
import GameController from './gamecontroller/GameController';
import styles from './app.less';
import uuid from 'uuid';
import { requestPlayerCreate } from './../../shared/actions';
import PropTypes from 'prop-types';

const CLASS_NAME = styles['app'];

class App extends Component {
	constructor() {
		super();

		this.handleSubmitClick = this.handleSubmitClick.bind(this);
		this.handlePlayerReady = this.handlePlayerReady.bind(this);
		this.state = {
			currentPlayer: null
		}
	}

	render() {
		const className = CLASS_NAME + (this.props.className ? ' ' + this.props.className : '');
		let content;
		if(this.state.currentPlayer === null) {
			content = <JoinPlayer 
				playerName={this.props.playerName}
				playerColor = { this.props.playerColor }
				localMode={this.props.localMode} 
				submitClick={this.handleSubmitClick}
			/>;
		} else if (!this.props.playing) {
			content = <Lobby currentPlayer={this.state.currentPlayer} playerReady={this.handlePlayerReady}/>			
		} else {
			content = <GameController />
		}
		
		const title = this.props.title || '';
		return (
			<div className={className}>
				<div> {title }</div>
				{ content}
			</div>
		);
	}

	handleSubmitClick(name, color, type='remote') {
		const id = uuid.v4();
		this.setState({
			currentPlayer: id
		});
		const action = requestPlayerCreate(id, name, color);
		this.props.dispatch(action);

		if(typeof this.props.playerJoined === 'function') {
			this.props.playerJoined(id);
		}
	}

	handlePlayerReady(){
		if(typeof this.props.playerReady === 'function') {
			this.props.playerReady(this.state.currentPlayer);
		}
	}
}

const mapStateToProps = state => {
	return {
		playing: state.playing
	}
}

App.propTypes = {
	playing: PropTypes.bool,
	localMode: PropTypes.bool,
	title: PropTypes.string,
	playerReady: PropTypes.func,
	playerReady: PropTypes.func,
}

export default connect(
	mapStateToProps
)(App);