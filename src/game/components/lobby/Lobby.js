import React  from 'react';
import PlayerList from '../../../controller/components/lobby/PlayerList';
import { requestPlayerReadyState } from './../../../shared/actions';
import TopBar from './../shared/TopBar';
import BottomBar from './../shared/BottomBar';
import Layout from './../layout/Layout';
import Canvas from './../canvas/Canvas';
import styles from './lobby.less';

const Lobby = (props) => {
	const className = styles['lobby'] + (props.className ? ' ' + props.className : '');
	let bottomLine1;

	if(props.players.length < props.numPlayersRequired) {
		const delta = props.numPlayersRequired - props.players.length;
		bottomLine1 = <p>Waiting on at least {delta} more player{delta != 1 ? 's' : ''} to join.</p>;
	} else {
		const playersReadyCount = props.players.filter(p => !p.ready).length;
		bottomLine1 = <p>Waiting on {playersReadyCount} player{playersReadyCount != 1 ? 's' : ''} to get ready.</p>
	}

	let bottomLine2;
	if(props.serverIP){
		bottomLine2 = <p>Point your mobile browser at: {props.serverIP}</p>
	}

	const localPlayerArrow = (
		<button onClick={props.arrowsButtonClicked}>arrow keys</button>
	)

	return  (
		<div className= {className }>
			<TopBar height="5">Starting game { localPlayerArrow } </TopBar>
			<PlayerList { ... props }/>
			<BottomBar height="15">{ bottomLine1 } { bottomLine2 }</BottomBar>
		</div>
	);
}
 
export default Lobby;