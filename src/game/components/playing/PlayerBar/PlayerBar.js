import React from 'react';
import styles from './playerBar.less';
import PlayerBarItem from './PlayerBarItem';


const PlayerBar = (props) => {
	const className = styles['player-bar'] + (props.className ? ' ' + props.className : '');
	return ( 
		<div className={className}> 
			{ props.players.map(p => <PlayerBarItem key={p.color} name={p.name} color={p.color} score="23"/>) }
		</div>
	);
}
 
export default PlayerBar;