import { connect } from 'react-redux';
import React, { Component } from 'react';
import { requestPlayerReadyState } from './../../../shared/actions';
import styles from './gamecontroller.less';
import { requestControl } from './../../../shared/actions';

class GameController extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			leftPressed: false,
			rightPressed: false
		}
	}
	
	render() {
		const leftClass = `${styles.left} ${this.state.leftPressed ? styles.pressed : ''}`; 
		const rightClass = `${styles.right} ${this.state.rightPressed ? styles.pressed : ''}`; 
		return <div className={styles['game-controller']}>
			<control-button 
				class = { leftClass}
				onTouchStart = { this.handleLeftDown.bind(this) }
				onTouchEnd = { this.handleLeftUp.bind(this) }
				onMouseDown  = { this.handleLeftDown.bind(this) }
				onMouseUp = { this.handleLeftUp.bind(this) }
			/>
			<control-button 
				class = { rightClass }
				onTouchStart = { this.handleRightDown.bind(this) }
				onTouchEnd = { this.handleRightUp.bind(this) }
				onMouseDown  = { this.handleRightDown.bind(this) }
				onMouseUp = { this.handleRightUp.bind(this) }
			/>
		</div>
	}

    handleLeftDown() {
        this.setState( { leftPressed: true });
		this.props.dispatch(requestControl('left', true));
    }

    handleLeftUp() {
        this.setState( { leftPressed: false });
		this.props.dispatch(requestControl('left', false));
    }
    
    handleRightDown() {
        this.setState( { rightPressed: true });
		this.props.dispatch(requestControl('right', true));
    }

    handleRightUp() {
        this.setState( { rightPressed: false });
		this.props.dispatch(requestControl('right', false));
    }

	checkFn(fn, ...rest) {
		if(typeof fn === 'function') {
			fn(rest);
		}
	}
}

const mapStateToProps = state => {
	return { 
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}
	
export default connect(
	mapStateToProps
)(GameController);