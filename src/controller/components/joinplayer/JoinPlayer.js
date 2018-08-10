import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from './color/ColorPicker';
import styles from './joinplayer.less';

class JoinPlayer extends Component {
	constructor(props) {
    	super(props);

		this.state = {
			name: props.playerName || '',
			color: props.playerColor || '',         // color chosen
			formValid: props.playerName && props.playerColor
		}
	}	
	
	render() {
		const className = styles['join-player']
		return <form className={className} onSubmit= { this.handleSubmit.bind(this) } >
			<div>
				<label>name</label>
				<input type='text' value={this.state.name} id='name' onChange= {this.handleNameChange.bind(this) } />
			</div>
			<div> 
				<label>color</label>
				<ColorPicker className={styles['input']}
					selectedColor = { this.state.color }
					players = { this.props.players }
					onChange = { this.handleColorChange.bind(this) }
				/>
			</div>
			<div className={styles['info']}>
				{ `${ this.props.players.length} player(s) in lobby`}
			</div>
			<div>
				<input type = 'submit' value='Join' disabled= { !this.state.formValid } />
			</div>
		</form>;
	}
	
	handleNameChange(event) {
		this.setState({ 
			name: event.target.value,
			formValid: event.target.value && this.state.color
		});
	}

	handleColorChange(value) {
        this.setState({
			color: value,
			formValid: !!this.state.name
        });
	}
	
	handleSubmit(event) {
		event.preventDefault();
		const { name, color } = this.state;
		this.props.submitClick(name, color );
	}
}

const mapStateToProps = state => {
	return {
		players: state.players
	}
}

export default connect(
	mapStateToProps
)(JoinPlayer);