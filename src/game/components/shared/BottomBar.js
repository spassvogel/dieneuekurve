import React from 'react';
import VerticalLayoutItem from './../../hoc/VerticalLayoutItem';
import styles from './bottomBar.less';

const BottomBar = (props) => {
	const className = styles['bottom-bar'] + (props.className ? ' ' + props.className : '');
	
	return (
		<div className={className} style={props.style}>
			{ props.children } 	
		</div>
	)
}
export default VerticalLayoutItem(BottomBar);