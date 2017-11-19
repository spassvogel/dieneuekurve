import React, { Component } from 'react';

const CLASS_NAME = 'swatch';
const SELECTED_CLASS_NAME = 'selected';

export const ColorSwatch = ({ color, selected, disabled, className, onClick }) => {

/*

        'disabled': {
            swatch: {
                background: 'none',
                width: disabedSize,
                paddingBottom: disabedSize,
                cursor: 'default',
                // boxSizing: 'border-box',
                border: `${disabledBorderSize}px solid ${color}`
            }
        },
        'custom': {
            swatch: style,
        },
    }, { 'disabled': disabled })*/

    const handleClick = (e) => onClick(color, e)
    className = className ? (className + ' ' + CLASS_NAME) : CLASS_NAME;
    
    const svgClass = selected ? SELECTED_CLASS_NAME : '';

    return (
        <div onClick={ handleClick } style={{ backgroundColor: color}} className={ className }>
            <svg viewBox="0 0 24 24" className={ svgClass } >
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
        </div>
  )
}
ColorSwatch.defaultProps = {
	disabled: false
}

export default ColorSwatch