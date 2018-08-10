import React  from 'react';
import PlayerList from '../../../controller/components/lobby/PlayerList';
import { requestPlayerReadyState } from './../../../shared/actions';
import TopBar from './../shared/TopBar';
import BottomBar from './../shared/BottomBar';
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
		bottomLine2 = <p>Point your mobile browser at: {props.serverIP}/controller</p>
	}

	const localPlayerZx = (
		<button onClick={props.zxButtonClicked}>z-x keys</button>		
	)
	const localPlayerArrow = (
		<button onClick={props.arrowsButtonClicked}>arrow keys</button>
	)

	return  (
		<div className= {className }>
			<TopBar height="5">Lobby  { localPlayerArrow } { localPlayerZx } </TopBar>
			<PlayerList { ... props }/>
			<BottomBar height="15">{ bottomLine1 } { bottomLine2 }</BottomBar>
		</div>
	);
}
 
export default Lobby;