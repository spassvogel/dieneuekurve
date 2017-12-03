import React, { Component } from 'react';
import ColorSwatch from './ColorSwatch'
import {} from './color.less';

const CLASS_NAME = 'color-picker';
class ColorPicker extends Component {
	constructor(props) {
    	super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSwatchCreated = this.handleSwatchCreated.bind(this);
  	}

	render() {
		const className = CLASS_NAME + (this.props.className ? ' ' + this.props.className : '');
		return <div className={ className }> { 
				this.props.colors.map(c => {
					const player = this.getPlayerByColor(c);
					return <ColorSwatch
						color = { c }
						selected = { this.props.selectedColor == c }
						onClick = { this.handleChange }
						key = { c} 
						disabled = { player !== null }
						title = { player !== null ? `${c} [${player.name}]` : c }
					/>
				})
			}
			</div>;
	}

	handleChange(color){
		if(typeof this.props.onChange === 'function'){
			this.props.onChange(color);			
		}
	}

	handleSwatchCreated(color){
		this.props.onChange(color);		
	}

	getPlayerByColor(color) {
		return this.props.players.find(p => p.color === color) || null;
	}
};

ColorPicker.defaultProps = {
	selectedColor: null,
	colors: ['#b80000', 
		'#db3e00',
		'#fccb00',
		'#008b02',
		'#006b76',
		'#1273de',	   
		'#004dcf',
		'#5300eb',
		'#9900ef',
		'#eb144c']
}


export default ColorPicker;