import React from 'react';



const PlayerBarItem = ({ color, name, score }) => {
	return ( 
		<div> 
			<span className='color' style={{ backgroundColor: color}}></span> 
			{ name } ({score})
		</div>
	);
}
 
export default PlayerBarItem;