import React, { Component } from 'react';
//import {} from './lobby.less';

class PlayerList extends Component {
	render() {
		return <ul> { 
			this.props.players.map(p => {
				const name = `${p.name} ${ this.props.currentPlayer === p.id ? '(you)' : ''}`
				return <li key={p.id} className= { p.ready ? 'ready': ''} >{ name }</li>
			})
		}
		</ul>
	}
}
export default PlayerList;