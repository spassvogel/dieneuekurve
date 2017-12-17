import React from 'react';
import styles from './lobby.less';


const PlayerList = (props) => (
	<ul> { 
		props.players.map(p => {
			const name = `${p.name} ${ props.currentPlayer === p.id ? '(you)' : ''}`
			const style = { color: p.color }
			return <li key={p.id} className= { p.ready ? styles['ready']: ''}  style={ style } >{ name }</li>
		})
	}
	</ul>
)
export default PlayerList;