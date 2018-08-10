import React, { Component } from 'react';
import styles from './canvas.less'

class Canvas extends Component {
	constructor() {
		super();
	}

	render() {
		const { initialWidth, height, aspectRatio } = this.props;
		const initialHeight = initialWidth * aspectRatio / 100 * height;
		return (
			<canvas width={initialWidth} height={initialHeight} state={ this.props.gameState } className={styles.canvas}></canvas> 
		)	
	}
}

export default Canvas;