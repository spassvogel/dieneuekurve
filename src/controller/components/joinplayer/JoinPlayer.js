import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import ColorPicker from './color/ColorPicker';
import { requestPlayerCreate } from './../../../shared/actions';
import {} from './joinplayer.less';

class JoinPlayer extends Component {
	constructor(props) {
    	super(props);

		this.state = {
			name: '',
			color: '',         // color chosen
			formValid: false
		}
	}	
	
	render() {
		return <form className='join-player' onSubmit= { this.handleSubmit.bind(this) } >
			<div>
				<label>name</label>
				<input type='text' id='name' onChange= {this.handleNameChange.bind(this) } />
			</div>
			<div> 
				<label>color</label>
				<ColorPicker className='input'
					selectedColor = { this.state.color }
					players = { this.props.players }
					onChange = { this.handleColorChange.bind(this) }
				/>
			</div>
			<div className='info'>
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
		const id = uuid.v4();
		const action = requestPlayerCreate(id, name, color);
		this.props.dispatch(action);
	}
}
const mapDispatchToProps = dispatch => {
	return { }
}
const mapStateToProps = state => {
	return {
		players: state.players
	}
}

export default connect(
	mapStateToProps
)(JoinPlayer);