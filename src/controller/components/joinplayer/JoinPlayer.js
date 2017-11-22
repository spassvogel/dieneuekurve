import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPlayerCreate } from './../../../shared/actions';
import ColorPicker from './color/ColorPicker';
import {} from './joinplayer.less';
import uuid from 'uuid';

class JoinPlayer extends Component {
	constructor(props) {
    	super(props);

		this.state = {
			name: '',
			color: '',         // color chosen
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
					onChange = { this.handleColorChange.bind(this) }
				/>
			</div>			
			<div>
				<input type = 'submit' value='Join'/>
			</div>
		</form>;
	}
	
	handleNameChange(event) {
		this.setState({ 
			name: event.target.value
		});
	}

	handleColorChange(value) {
        this.setState({
            color: value
        });
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		const { name, color } = this.state;
		const id = uuid.v4();
		this.props.dispatch(requestPlayerCreate(id, name, color));

	}
}
const mapDispatchToProps = dispatch => {
	return { }
}
const mapStateToProps = state => {
	return { }
}

export default connect(
)(JoinPlayer);