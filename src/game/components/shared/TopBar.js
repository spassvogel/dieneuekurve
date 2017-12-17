import React from 'react';
import VerticalLayoutItem from './../../hoc/VerticalLayoutItem';
import styles from './topBar.less';

const TopBar = (props) => {
	const className = styles['top-bar'] + (props.className ? ' ' + props.className : '');
	
	return (
		<div className={className} style={props.style}>
			<span>{ props.children }</span>
		</div>
	)
}
export default VerticalLayoutItem(TopBar);