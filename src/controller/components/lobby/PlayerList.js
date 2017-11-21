import React, { Component } from 'react';
//import {} from './lobby.less';

class PlayerList extends Component {
	render() {
		return <ul> { 
			this.props.players.map(p => {
				return <li key={p.id}>{ p.name }</li>
			})
		}
		</ul>
	}
}
export default PlayerList;