import React from 'react';
import ColorSwatch from './ColorSwatch'
import styles from './color.less';


const ColorPicker = (props) => {
	const className = styles['color-picker'] + (props.className ? ' ' + props.className : '');
	const getPlayerByColor = (color) => {
		return props.players.find(p => p.color === color) || null;
	}

	return (
		<div className={ className }> { 
			props.colors.map(c => {
				const player = getPlayerByColor(c);
				return <ColorSwatch
					color = { c }
					selected = { props.selectedColor == c }
					onClick = { props.onChange }
					key = { c} 
					disabled = { player !== null }
					title = { player !== null ? `${c} [${player.name}]` : c }
				/>
			})
		}
		</div>
	);
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