import React, { Component } from 'react';


class Canvas extends Component {
	constructor() {
		super();
	}

	render() {
		const { initialWidth, height, aspectRatio } = this.props;
		const initialHeight = initialWidth * aspectRatio / 100 * height;
		return (
			<canvas width={initialWidth} height={initialHeight} state={ this.props.gameState }></canvas> 
		)	
	}
}
// const Canvas = ({ initialWidth, height, aspectRatio }) => {
// 	const initialHeight = initialWidth * aspectRatio / 100 * height;
// 	return (
// 		<canvas width={initialWidth} height={initialHeight}></canvas>
// 	)
// } 

export default Canvas;