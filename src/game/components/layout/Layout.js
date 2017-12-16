import React from 'react';
//Does not do much at the moment
const Layout = (props) => {
	// const styledChildren = props.children.map((c, i) => {
	// 	console.log(c.props.height);
	// 	const cloneProps = {
	// 		key: i,
	// 		style:  {
	// 			height: `${c.props.height}%`
	// 		}
	// 	};
	// 	const clone = React.cloneElement(c, cloneProps);
	// 	return clone;
	// });
	// return styledChildren;
	return props.children;
}
 
export default Layout;