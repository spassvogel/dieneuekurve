import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayerBar from './PlayerBar/PlayerBar';
import TopBar from './../shared/TopBar';
import BottomBar from './../shared/BottomBar';
import Canvas from './../canvas/Canvas';
import GameCanvas from '../../canvas/GameCanvas'
import { GAME_STATES } from './../App';

const CLASS_NAME = 'playing';
const COUNTDOWN = 3;

class Playing extends Component {
	constructor() {
		super();
		
		this.state = {
			topBarText: ''
		}
		this.gameCanvas = null;
		this.handlePlayerDies = this.handlePlayerDies.bind(this);
		this.handlePlayerWins = this.handlePlayerWins.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	render() {
		const className = CLASS_NAME + (this.props.className ? ' ' + this.props.className : '');

		return (
			<div className= {className } >
				<TopBar height="5">{ this.state.topBarText }</TopBar>
				<Canvas height="85" initialWidth="1280" aspectRatio={ 9/16 }  ref={(c) => this.canvas = c}   />
				<BottomBar height="10"><PlayerBar players={this.props.players}/></BottomBar>
			</div>		
		)	
	}

	componentDidMount() {
		this.gameCanvas = new GameCanvas(ReactDOM.findDOMNode(this.canvas));
		this.gameCanvas.onPlayerDies = this.handlePlayerDies;
		this.gameCanvas.onPlayerWins = this.handlePlayerWins;
		//this.prepareNextRound();

		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleKeyDown);
		window.removeEventListener("keyup", this.handleKeyUp);
	}

	componentWillReceiveProps(nextProps) {
		console.log('cwrp');
		if(this.props.gameState === GAME_STATES.waitingForRound){
			this.gameCanvas.prepareRound(this.props.players);
			let counter = COUNTDOWN;
			const interval = 1000;

			const counterInterval = setInterval(() => {
				if(--counter === 0){
					clearInterval(counterInterval);
					setTimeout(() => {
						this.setState({
							topBarText:  `Round ${this.props.round}. Achtung!`
						});

						this.gameCanvas.startRound();
					}, interval);					
				}
				else {
					this.setState({
						topBarText: `Round ${this.props.round}. Get ready: ${counter}`						
					});
				}
			}, interval);	
		}		
	}

	handleKeyDown(event) {
		const playerId = this.props.players[0].id
		switch(event.key){
			case "ArrowLeft":
				this.gameCanvas.control(playerId, 'left', true);
				break;
			case "ArrowRight":
				this.gameCanvas.control(playerId, 'right', true);
				break;
		}
	}
	
	handleKeyUp(event) {
		const playerId = this.props.players[0].id
		
		switch(event.key){
			case "ArrowLeft":
				this.gameCanvas.control(playerId, 'left', false);
				break;
			case "ArrowRight":
				this.gameCanvas.control(playerId, 'right', false);
				break;
		}
	}

	handlePlayerDies(id) {

	}

	handlePlayerWins(id) {
		const player = this.props.players.find(p => p.id === id);
		this.setState({
			topBarText: <div><span style={{ 'color': player.color }} >{ player.name }</span> { "wins! " } </div>					
		});
		if(typeof this.props.playerWins === 'function') {
			this.props.playerWins(id);
		}		
	}
}
 
export default Playing;