import React from 'react';

const VerticalLayoutComponent = Component => props => {
	let style = props.style || {};
	if(props.height) {
		style = { ...style, 
			height: `${props.height}%`,
			//fontSize: `${props.height}vh`
		};
	}
	return <Component {...props} style={ style }/>;
};
export default VerticalLayoutComponent;