import React, { Component } from 'react';
import ColorPicker from './color/ColorPicker';
import {} from './joinplayer.less';

export default class JoinPlayer extends Component {
	constructor(props) {
    	super(props);

		this.state = {
			inputColor: '',         // color chosen
		}
	  }
	  
	
	
	render() {
		return <div className='join-player'>
			<div>
				<label>name</label>
				<input type='text' id='name'/>
			</div>
			<div> 
				<label>color</label>
				<ColorPicker className='input'
					selectedColor = { this.state.inputColor }
					onChange = { this.handleColorChange.bind(this) }
				/>
			</div>			
			<div>
				<button>Join</button>
			</div>
		</div>;
	}
	
	handleColorChange(value) {
        this.setState({
            inputColor: value
        });
    }
}
