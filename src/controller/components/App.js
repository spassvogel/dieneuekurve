import React, { Component } from 'react';
import { connect } from 'react-redux';
import JoinPlayer from './joinplayer/JoinPlayer';
import Lobby from './lobby/Lobby';
import {} from './app.less';

class App extends Component {
	render() {
		console.log(this.props)
		if(this.props.currentPlayer === null) {
			return  <JoinPlayer/>;
		}
		//return <div>Hello a@@@world from a React component</div>;
		//return <JoinPlayer/>
		return <Lobby/>
	}
}
const mapStateToProps = state => {
	return {
		currentPlayer: state.currentPlayer,
		players: state.players		
	}
}

export default connect(
	mapStateToProps,
)(App);