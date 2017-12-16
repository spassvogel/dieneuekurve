import React from 'react';
import VerticalLayoutItem from './../../hoc/VerticalLayoutItem';
import './topBar.less';
const CLASS_NAME = 'top-bar';

const TopBar = (props) => {
	const className = CLASS_NAME + (props.className ? ' ' + props.className : '');
	
	return (
		<div className={className} style={props.style}>
			<span>{ props.children }</span>
		</div>
	)
}
export default VerticalLayoutItem(TopBar);