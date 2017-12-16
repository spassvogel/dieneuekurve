import React from 'react';
import VerticalLayoutItem from './../../hoc/VerticalLayoutItem';
import './bottomBar.less';

const CLASS_NAME = 'bottom-bar';

const BottomBar = (props) => {
	const className = CLASS_NAME + (props.className ? ' ' + props.className : '');
	
	return (
		<div className={className} style={props.style}>
			{ props.children } 	
		</div>
	)
}
export default VerticalLayoutItem(BottomBar);