import React from 'react';
import './playerBar.less';
import PlayerBarItem from './PlayerBarItem';

const CLASS_NAME = 'player-bar';


const PlayerBar = (props) => {
	const className = CLASS_NAME + (props.className ? ' ' + props.className : '');
	return ( 
		<div className={className}> 
			{ props.players.map(p => <PlayerBarItem key={p.color} name={p.name} color={p.color} score="23"/>) }
		</div>
	);
}
 
export default PlayerBar;