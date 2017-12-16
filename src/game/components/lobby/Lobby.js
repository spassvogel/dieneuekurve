import React  from 'react';
import PlayerList from '../../../controller/components/lobby/PlayerList';
import { requestPlayerReadyState } from './../../../shared/actions';
import TopBar from './../shared/TopBar';
import BottomBar from './../shared/BottomBar';
import Layout from './../layout/Layout';
import Canvas from './../canvas/Canvas';
import './lobby.less';

const CLASS_NAME = 'lobby';

const Lobby = (props) => {
	const className = CLASS_NAME + (props.className ? ' ' + props.className : '');
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

	return  (
		<div className= {className }>
			<TopBar height="5">Starting game</TopBar>
			{/* <Canvas height="80" initialWidth="1280" aspectRatio={ 9/16 } /> */}
			<PlayerList { ... props }/>
			<BottomBar height="15">{ bottomLine1 } { bottomLine2 }</BottomBar>
		</div>
	);
}
 
export default Lobby;