import React from 'react';
import styles from './color.less';

const CLASS_NAME = styles['swatch'];
const SELECTED_CLASS_NAME = styles['selected'];
const DISABLED_CLASS_NAME = styles['disabled'];

export const ColorSwatch = ({ color, selected, disabled, className, onClick, title = color }) => {

    const handleClick = (e) => {
        if(typeof onClick === 'function'){
            onClick(color, e);            
        }
    }
    const classNames = [CLASS_NAME];
    if(className) {
        classNames.push(className);
    }
    if(disabled) {
        classNames.push(DISABLED_CLASS_NAME);
    }
    
    const svgClass = selected ? SELECTED_CLASS_NAME : '';
    const style = !disabled ? { backgroundColor: color, borderColor: color } : { borderColor: color };

    return (
        <div 
            onClick = { handleClick } 
            style = { style }
            className ={ classNames.join(' ') } 
            title = { title }
        >
            <svg viewBox="0 0 24 24" className={ svgClass } >
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
        </div>
  )
}
ColorSwatch.defaultProps = {
	disabled: false
}

export default ColorSwatch;